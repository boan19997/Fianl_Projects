import React, { useEffect } from "react";
import { FaUser } from 'react-icons/fa'
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi'
import { RiUserStarFill } from 'react-icons/ri'

import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from "../../api";
import DashboardCard from "../../components/Card/DashboardCard";
import { actionType } from "../../context/reducer";
import { useStateValue } from '../../context/StateProvider'

function DashboardHome() {
    const [{ allUsers, allSongs, allArtists, allAlbums}, dispatch] = useStateValue();

    //lấy dữ liệu danh sách user
    useEffect(() => {
        if(!allUsers) {
            getAllUsers().then((data) => {
                dispatch({
                    type : actionType.SET_ALL_USERS,
                    allUsers : data.data
                })
            })
        }

        //lấy dữ liệu danh sách artists
        if(!allArtists) {
            getAllArtists().then((data) => {
                dispatch({
                    type : actionType.SET_ALL_ARTISTS,
                    allArtists : data.artist
                })
            })
        }

        //lấy dữ liệu danh sách albums
        if(!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({
                    type : actionType.SET_ALL_ALBUMS,
                    allAlbums : data.album
                })
            })
        }

        //lấy dữ liệu danh sách song
        if(!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type : actionType.SET_ALL_SONGS,
                    allSongs : data.songs
                })
            })
        }
    }, [])

    return (    
    <div className="w-full flex items-center justify-evenly flex-wrap">
        <DashboardCard icon={<FaUser className="text-3xl text-textColor"/>} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0}/>
        <DashboardCard icon={<GiLoveSong className="text-3xl text-textColor"/>} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0}/>
        <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor"/>} name={"Artists"} count={allArtists?.length > 0 ? allArtists?.length : 0}/>
        <DashboardCard icon={<GiMusicalNotes className="text-3xl text-textColor"/>} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums?.length : 0}/>
    </div> 
    );
}

export default DashboardHome;