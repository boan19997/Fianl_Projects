import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {IoHome} from "react-icons/io5"
import { FaUserCircle } from 'react-icons/fa'
import { MdLibraryMusic } from 'react-icons/md'
import { GiLoveSong } from 'react-icons/gi'
import { RiUserStarFill } from 'react-icons/ri'

import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";
import DashboardHome from './DashboardHome'
import DashboardUsers from './DashboardUsers'
import DashboardSongs from './DashboardSongs'
import DashboardAlbums from "./DashboardAlbums";
import DashboardArtists from "./DashboardArtists";
import DashboardNewSong from "./DashboardNewSong";
import DashboardNewArtist from "./DashboardNewArtist";
import DashboardNewAlbum from "./DashboardNewAlbum";
import Alert from "../../components/Alert";
import { useStateValue } from "../../context/StateProvider";
import { ButtonUser, Sidebar } from "../../components";
function Dashborad() {

    const [{ alertType }, dispath] =useStateValue("")

    return (
        <div className='flex'>
            <Sidebar/>
            <div className="w-190 p-5 text-2xl font-semibold flex-1 h-screen">
                <div className=" w-full p-4 md:py-2 md:px-3 flex items-center">
                    <ButtonUser/>
                </div>
                <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
                    <div className="w-[80%] p-3 flex items-center justify-evenly">
                        <NavLink to={"/dashboard/home"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}> <IoHome className="text-2xl text-textColor"/></NavLink>
                        {/* user nên xài iconss */}
                        <NavLink to={"/dashboard/user"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}> <FaUserCircle className="text-2xl text-textColor"/> </NavLink>
                        <NavLink to={"/dashboard/songs"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}> <GiLoveSong className="text-2xl text-textColor"/></NavLink>
                        <NavLink to={"/dashboard/artists"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}> <RiUserStarFill className="text-2xl text-textColor"/></NavLink>
                        <NavLink to={"/dashboard/albums"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}> <MdLibraryMusic className="text-2xl text-textColor"/></NavLink>
                    </div>
                    <Routes>
                        <Route path="/home" element={<DashboardHome/>}/>
                        <Route path="/user" element={<DashboardUsers/>}/>
                        <Route path="/songs" element={<DashboardSongs/>}/>
                        <Route path="/artists" element={<DashboardArtists/>}/>
                        <Route path="/albums" element={<DashboardAlbums/>}/>
                        <Route path="/newSong" element={<DashboardNewSong/>}/>
                        <Route path="/newArtist" element={<DashboardNewArtist/>}/>
                        <Route path="/newAlbum" element={<DashboardNewAlbum/>}/>
                    </Routes>

                    {alertType && (
                        <Alert type={alertType}/>
                    )}
                </div>
            </div> 
        </div>
    );
}

export default Dashborad;