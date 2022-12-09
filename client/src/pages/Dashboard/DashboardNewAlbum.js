import React, { useState } from "react";
import { BiCloudUpload } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { motion } from "framer-motion";
import { useStateValue } from '../../context/StateProvider'
import { getAllAlbums, saveNewAlbum} from "../../api";
import { actionType } from "../../context/reducer";
import { storage } from "../../config/firebase.config";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import DisabledButton from "../../components/Button/DisabledButton";

function DashboardNewAlbum() {

    const [albumImageCover, setAlbumImageCover ] = useState(null)
    const [albumImageUploadProgress, setAlbumImageUploadProgress] = useState(0)
    const [isAlbumUpLoading, setIsAlbumUpLoading] = useState(false)
    const [albumName, setAlbumName] = useState("")

    const [{
        alertType
    },dispath
    ] = useStateValue()

    const deleteFileObject = (url, isImages) => {
        if(isImages) {
         setIsAlbumUpLoading(true)
        }
        const deleteRef = ref(storage, url)
        deleteObject(deleteRef).then(() => {
         setAlbumImageCover(null)
         setIsAlbumUpLoading(false)
        })
 
        //hiển thị thông báo
        dispath({
            type : actionType.SET_ALERT_TYPE,
            alertType : "success"
        })
 
        setInterval(() => {
            dispath({
                type : actionType.SET_ALERT_TYPE,
                alertType : null
            })
        }, 5000)
    }

    //save
    const saveAlbum = () => {
        if (!albumImageCover || !albumName) {
            
            //hiển thị thông báo
            dispath({
                type : actionType.SET_ALERT_TYPE,
                alertType : "danger"
            })

            setInterval(() => {
                dispath({
                    type : actionType.SET_ALERT_TYPE,
                    alertType : null
                })
            }, 5000)

        } else {
            setIsAlbumUpLoading(true)

            const data = {
                name: albumName,
                imageURL: albumImageCover,
            }

            saveNewAlbum(data).then(() => {
                getAllAlbums().then((data) => {
                    dispath({
                        type : actionType.SET_ALL_ALBUMS,
                        allAlbums : data.album
                    })
                })
            })

            //hiển thị thông báo
            dispath({
                type : actionType.SET_ALERT_TYPE,
                alertType : "success"
            })

            setInterval(() => {
                dispath({
                    type : actionType.SET_ALERT_TYPE,
                    alertType : null
                })
            }, 5000)

            setIsAlbumUpLoading(false)
            setAlbumImageCover(null)
            setAlbumName("")
        }
    }

    return ( 
        <div className="w-[80%] flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
            {/* upload album */}
            <p className="text-xl font-semibold text-headingColor">Album Details</p>
            <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
                {isAlbumUpLoading && <FileLoader progress = {albumImageUploadProgress}/>}
                {!isAlbumUpLoading && (
                    <>
                        {!albumImageCover ? (
                           <FileUploader 
                                updateState = {setAlbumImageCover}
                                setProgress = {setAlbumImageUploadProgress} 
                                isLoading = {setIsAlbumUpLoading}
                                isImage = {true}
                           />) : (
                                <div className="relative w-full h-full overflow-hidden rounded-md">
                                    <img
                                    src={albumImageCover}
                                    className="w-full h-full object-cover"
                                    alt=""
                                    />

                                    <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                                    onClick={() => deleteFileObject(albumImageCover, true)}>
                                        <MdDelete className="text-white" />
                                    </button>
                                </div>
                           )}
                    </>
                )}
            </div>

            {/* album name */}
            <input 
                className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
                type="text"
                placeholder="Album name..."
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
            />

            {/* nút save Album */}
            <div className="flex items-center justify-center w-60 cursor-pointer p-4">
                {isAlbumUpLoading ? (
                    <DisabledButton />
                ) : (
                    <motion.button 
                        className="px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg"
                        whileTap={{scale : 0.75}}
                        onClick={saveAlbum} 
                    >
                        Save Album
                    </motion.button>
                )}
            </div>
        </div>
     );
}

export const FileLoader = ({progress}) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-xl font-semibold text-textColor">
                {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
            </p>
            <div className="w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>
            </div>
        </div>
    )
}

export const FileUploader = ({updateState, setProgress, isLoading, isImage}) => {

    const [{ alertType }, dispath] = useStateValue()

    const uploadFile = (e) => {
        isLoading(true)
        const uploadedFile = e.target.files[0]

        const storageRef = ref(
            storage,
            `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`
        )

        const uploadTask = uploadBytesResumable(storageRef, uploadedFile)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgress((snapshot.bytesTransferred /snapshot.totalBytes) * 100)
            },
            (error) => {
                //hiển thị thông báo
                dispath({
                    type : actionType.SET_ALERT_TYPE,
                    alertType : "danger"
                })

                setInterval(() => {
                    dispath({
                        type : actionType.SET_ALERT_TYPE,
                        alertType : null
                    })
                }, 5000)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateState(downloadURL)
                    isLoading(false)
                })

                //hiển thị thông báo
                dispath({
                    type : actionType.SET_ALERT_TYPE,
                    alertType : "success"
                })

                setInterval(() => {
                    dispath({
                        type : actionType.SET_ALERT_TYPE,
                        alertType : null
                    })
                }, 5000)

            }
        )

    }

    return (
        <label>
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-col justify-center items-center cursor-pointer">
                    <p className="font-bold">
                        <BiCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload { isImage ? "an image" : "an audio"}</p>
                </div>
            </div>
            {/* để bấm vào khung hiện lên chọn file */}
            <input 
            type="file"
            name="upload-file"
            accept={`${isImage ? "image/*" : "audio/*"}`}
            className={"w-0 h-0"}
            onChange={uploadFile}
            />
        </label>
    )
}

export default DashboardNewAlbum;