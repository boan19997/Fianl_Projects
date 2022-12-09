import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import {
  deleteAlbumById,
  deleteArtistById,
  deleteSongById,
  getAllAlbums,
  getAllArtists,
  getAllSongs,
} from "../../api";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { storage } from "../../config/firebase.config";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

function SongCard({ data, index, type, user }) {
    const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);

  const [
    { alertType, allAlbums, allSongs, allArtists, songIndex, isSongPlaying },
    dispath,
  ] = useStateValue();

  const deleteData = (data) => {
    //delete Song
    if (type === "song") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});

      deleteSongById(data._id).then((res) => {
        if (res.data) {
          //hiển thị thông báo
          dispath({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });

          setInterval(() => {
            dispath({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 5000);

          getAllSongs().then((data) => {
            dispath({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.songs,
            });
          });
        } else {
          //hiển thị thông báo
          dispath({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });

          setInterval(() => {
            dispath({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 5000);
        }
      });
    }

    //delete Album
    if (type === "album") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});

      deleteAlbumById(data._id).then((res) => {
        if (res.data) {
          //hiển thị thông báo
          dispath({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });

          setInterval(() => {
            dispath({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 5000);

          getAllAlbums().then((data) => {
            dispath({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.album,
            });
          });
        } else {
          //hiển thị thông báo
          dispath({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });

          setInterval(() => {
            dispath({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 5000);
        }
      });
    }

    //delete Artist
    if (type === "artist") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});

      deleteArtistById(data._id).then((res) => {
        if (res.data) {
          //hiển thị thông báo
          dispath({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });

          setInterval(() => {
            dispath({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 5000);

          getAllArtists().then((data) => {
            dispath({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data.artist,
            });
          });
        } else {
          //hiển thị thông báo
          dispath({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });

          setInterval(() => {
            dispath({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 5000);
        }
      });
    }
  };

  const addToContext = () => {
    if (!isSongPlaying) {
      dispath({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }

    if (songIndex !== index) {
      dispath({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  const nextpageDetailAlbum = () => {
    navigate('/album/'+data._id+"/"+data.name)
  }

  return (
    <>
      {user !== true ? (
        <>
          <motion.div
            className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
            onClick={type === "song" && addToContext}
          >
            {/* avatar của song */}
            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
              <motion.img
                className="w-full h-full rounded-lg object-cover"
                src={data.imageURL}
                whileHover={{ scale: 1.05 }}
              />
            </div>

            {/* tên bài hát dòng 2 là tên tác giả */}
            <p className="text-base text-center text-headingColor font-semibold my-2">
              {data.name.length > 25
                ? `${data.name.slice(0, 25)}..`
                : data.name}
              {data.artist && (
                <span className="block text-sm text-gray-400 my-1">
                  {data.artist.length > 25
                    ? `${data.artist.slice(0, 25)}....`
                    : data.artist}
                </span>
              )}
            </p>

            {/* button delete */}
            {user !== true ? (
              <div className="w-full absolute bottom-2 right-2 flex items-center justify-end px-4 ">
                <motion.i
                  className="text-base text-red-400 drop-shadow-md hover:text-red-600"
                  whileTap={{ scale: 0.75 }}
                  onClick={() => setIsDelete(true)}
                >
                  <IoTrash />
                </motion.i>
              </div>
            ) : (
              <></>
            )}

            {/* delete */}
            {isDelete && (
              <motion.div
                className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex flex-col items-center justify-center px-4 py-2 gap-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-lg text-headingColor font-semibold text-center">
                  Are you sure do you want to delete it?
                </p>
                <div className="flex items-center gap-4">
                  <motion.button
                    className="px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer"
                    whileTap={{ scale: 0.7 }}
                    onClick={() => deleteData(data)}
                  >
                    Yes
                  </motion.button>
                  <motion.button
                    className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer"
                    whileTap={{ scale: 0.7 }}
                    onClick={() => setIsDelete(false)}
                  >
                    No
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>{" "}
        </>
      ) : (
        <>
        <motion.div
            className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
            onClick={nextpageDetailAlbum}>
            {/* avatar của song */}
            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
              <motion.img
                className="w-full h-full rounded-lg object-cover"
                src={data.imageURL}
                whileHover={{ scale: 1.05 }}
              />
            </div>

            {/* tên bài hát dòng 2 là tên tác giả */}
            <p className="text-base text-center text-headingColor font-semibold my-2">
              {data.name.length > 25
                ? `${data.name.slice(0, 25)}..`
                : data.name}
              {data.artist && (
                <span className="block text-sm text-gray-400 my-1">
                  {data.artist.length > 25
                    ? `${data.artist.slice(0, 25)}....`
                    : data.artist}
                </span>
              )}
            </p>
          </motion.div>{" "}
        </>
      )}
    </>
  );
}

export default SongCard;
