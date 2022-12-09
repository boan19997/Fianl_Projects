import React, { useState, useEffect } from "react";
import { ButtonUser, Search, Sidebar } from "../../components";
import { getrank } from "../../api";
import PlayCard from "../../components/Card/PlayCard";
import HomeContainer from "../Home/HomeContainer";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

function Trending() {
    let number = 1
    const [{ allSongs }, dispath] = useStateValue();

  useEffect(() => {
    getrank().then((data) => {
      dispath({
        type: actionType.SET_ALL_SONGS,
        allSongs: data.songs,
      });
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-5 text-2xl font-semibold flex-1 h-screen">
        {/* header */}
        <div className=" w-full p-4 md:py-2 md:px-3 flex items-center">
          {/* <Search/> */}
          <ButtonUser />
        </div>
        <h2 className="font-mono text-3xl text-gray-500">
          Trending page
        </h2>

        <div className="grid gap-y-6 pt-6">
          <HomeContainer data={allSongs} rank={true}/>
        </div>
        
      </div>
    </div>
  );
}

export default Trending;
