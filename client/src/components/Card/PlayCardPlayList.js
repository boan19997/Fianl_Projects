import React from 'react'
import { BsFillPlayFill,  BsHeartFill } from 'react-icons/bs'
import { RiPlayListAddFill } from 'react-icons/ri' 
import { actionType } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'
import { addFavourites, deletePlaylist, getFavourites } from '../../api'

function PlayCardPlayList({ data, index}) {
    const [{ songIndex, isSongPlaying , user }, dispath] = useStateValue()

    const addToContext = () => {
        if (!isSongPlaying) {
            dispath({
                type : actionType.SET_ISSONG_PLAYING,
                isSongPlaying : true,
            })
        }

        if (songIndex !== index) {
            dispath({
                type : actionType.SET_SONG_INDEX,
                songIndex : index,
            })
        }
    }
    const addToFavourites = (id) => {
        let  dataAdd= {
                id_user: user.user._id,
                id_music: id
            }
            console.log(dataAdd)
        
        addFavourites(dataAdd).then((data1) => {
            console.log('datafavorite',data1)
            if(data1.success== true){
                getFavourites(user.user._id).then((data) => {
                    console.log('datafavorite',data.user.songs)
                    dispath({
                        type : actionType.SET_All_FAVORITE,
                        listFauvorites : data.user.songs,
                    })
                })
                alert("add success")
            }
            dispath({
                type : actionType.SET_ADD_FAVORITE,
                // user : data1.user,
            })
        })
    }
    const deletetoPlayList = (id) =>{
        let  dataAdd= {
            id_user: user.user._id,
            id_music: id
        }
        console.log(dataAdd)
    
    deletePlaylist(dataAdd).then((data1) => {
        console.log('datadeleteList',data1)
        if(data1.success== true){
            getFavourites(user.user._id).then((data) => {
                console.log('datalist',data.user.playlist)
                dispath({
                    type : actionType.SET_All_PLAYLIST,
                    listPlayList : data.user.playlist,
                })
            })
            alert("delete success")
        }
        dispath({
            type : actionType.SET_ADD_PLAYLIST,
            listPlayList : data.user.playlist,
        })
    })
    }
    const notifyAdded = () =>{
        alert("Added playlist")
    }

    return ( 
        <div>
            <div className='bg-gray-900 p-4 rounded-md flex-1 '>
                <div className='flex justify-end'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>deletetoPlayList(data._id)} className="w-6 h-6 text-gray-50 text-base hover:text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </div>
                <div 
                className='bg-gray-600 p-4 rounded-md flex-1 hover:bg-slate-200 group:'
                onClick={addToContext}
                >
                <div>
                    <div className='pt-[100%] mb-4 relative'>
                        <img src={data.imageURL} alt='song' className='absolute inset-0 object-cover w-full h-full' />
                        {/* button còn thiếu  */}
                        <button className='w-10 h-10 rounded-full bg-red-500 absolute bottom-2 right-2 flex items-center justify-center group-hover:flex'>
                            <BsFillPlayFill/>
                        </button>
                    </div>
                    <div>
                        <h5 className='truncate text-base font-bold font-sans'> {data.name.length > 0 ? `${data.name.slice(0,25)}..` : data.name}</h5>
                        <p className='overflow-hidden text-ellipsis whitespace-normal text-lime-100 text-sm font-medium font-sans mt-1'>
                            {data.artist && (<>{data.artist.length > 25 ? `${data.artist.slice(0,25)}....` : data.artist}</>
                            )}
                        </p>
                    </div>
                </div>
                </div>
                    
                <div className='flex justify-around mt-1.5'>
                    <div className={`cursor-pointer items-center text-white duration-500 w-10  hover:text-red-500`}  onClick={()=>addToFavourites(data._id)}>
                        <BsHeartFill/>
                    </div>
                    <div className={`cursor-pointer flex justify-end text-white duration-500 w-10 hover:text-blue-500`} onClick={notifyAdded}>
                        <RiPlayListAddFill/>
                    </div>
                </div>
            </div>
        </div>
        
     );
}

export default PlayCardPlayList;