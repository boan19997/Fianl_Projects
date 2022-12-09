import React, { useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { getAllAlbums } from "../../api";
import AlbumContainer from "../../components/Container/AlbumContainer";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { ButtonUser, Search, Sidebar } from "../../components";

function Album() {

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
        <div className='flex'>
            <Sidebar/>
            <div className="p-5 text-2xl font-semibold flex-1 h-screen">
                
                {/* header */}
                    <div className=" w-full p-4 md:py-2 md:px-3 flex items-center">
                        <ButtonUser/>
                    </div>
                    
                    Album page
                    <AlbumContainer data={allAlbums} user={true}/>
                </div>
        </div>
     );
}

export default Album;