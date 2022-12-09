import React, { useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { getAllAlbums } from "../../api";
import AlbumContainer from "../../components/Container/AlbumContainer";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

function DashboardAlbums() {

    const [{ allAlbums }, dispath] = useStateValue()

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

    return ( 
        <div className="w-full p-4 flex items-center justify-center flex-col">
                <div className="w-full flex items-center gap-20">
                    <NavLink to={"/dashboard/newAlbum"} className="flex items-center justify-center px-4 py-3 border rounded-md bg-green-500 border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
                        <IoAdd className="text-white "/>
                    </NavLink>
                </div>

            <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md ">
            <div className="absolute top-4 left-4">
                    <p className="text-xl font-bold ">
                        <span className="text-sm font-semibold text-textColor">Count : </span>
                        {allAlbums?.length}
                    </p>
                </div>

                <AlbumContainer data={allAlbums} />
            </div>
        </div> 
    );
}

export default DashboardAlbums;