import React, { useEffect } from "react";

import { getAllArtists } from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import ArtistContainer from "../../components/Container/ArtistContainer";
import { NavLink } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

function DashboardArtists() {

    const [{ allArtists }, dispath] = useStateValue()

    useEffect(() => {
        if (!allArtists) {
            getAllArtists().then((data) => {
                dispath({
                    type : actionType.SET_ALL_ARTISTS,
                    allArtists : data.artist,
                })
            })
        }
    }, [])

    return ( 
        <div className="w-full p-4 flex items-center justify-center flex-col">
                <div className="w-full flex items-center gap-20">
                    <NavLink to={"/dashboard/newArtist"} className="flex items-center justify-center px-4 py-3 border rounded-md bg-green-500 border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
                        <IoAdd className="text-white "/>
                    </NavLink>
                </div>

            <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md ">
                <div className="absolute top-4 left-4">
                    <p className="text-xl font-bold ">
                        <span className="text-sm font-semibold text-textColor">Count : </span>
                        {allArtists?.length}
                    </p>
                </div>

                <ArtistContainer data={allArtists} />
            </div>
        </div> 
    );
}
export default DashboardArtists;