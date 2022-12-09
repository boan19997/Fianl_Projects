import React, { useEffect, useState } from "react";
import { getAllSongs,getAllAlbums, searchNameSong } from "../../api";
import { AlbumContainer, ButtonUser,  Sidebar } from "../../components";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import HomeContainer from "./HomeContainer";

function Home() {
  const [{ allSongs, allAlbums }, dispath] = useStateValue();
  const [valueData, setvalueData] = useState("");
  const [isFoucs, setIsFoucs] = useState(false);

  useEffect(() => {
    if (!allAlbums) {
        getAllAlbums().then((data) => {
            dispath({
                type : actionType.SET_ALL_ALBUMS,
                allAlbums : data.album,
            })
        })
    }
  }, [])

  useEffect(() => {
    if (valueData) {
      searchNameSong(valueData).then((data) => {
        dispath({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.songs,
          });
      });
    }else {
        if (!allSongs) {
            getAllSongs().then((data) => {
              dispath({
                type: actionType.SET_ALL_SONGS,
                allSongs: data.songs,
              });
            });
          }
    }
  }, [valueData]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-5 text-2xl font-semibold flex-1 h-screen">
        {/* header */}
        <div className=" w-full p-4 md:py-2 md:px-3 flex items-center">
          {/* <Search /> */}

          <input
            className={`w-80 px-4 py-2 border ${
              isFoucs ? "border-gray-900 shadow-md" : "border-gray-500"
            } rounded-3xl bg-transparent
        outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
            type="text"
            onChange={(e) => setvalueData(e.target.value)}
            placeholder="Search here..."
            onBlur={() => {
              setIsFoucs(false);
            }}
            onFocus={() => setIsFoucs(true)}
          />

          <ButtonUser />
        </div>
        <h2 className="font-mono text-3xl text-gray-500">
          Home Music
        </h2>

        <div className="grid gap-y-6 pt-6">
          <HomeContainer data={allSongs} />
        </div>

        <h2 className="font-mono text-3xl text-gray-500">
          Album Music
        </h2>

        <div className="grid gap-y-6 pt-6">
          <AlbumContainer data={allAlbums} user={true}/>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
