import React, { useEffect, useState } from 'react'
import { getAllSongs, getFavourites } from '../../api';
import { ButtonUser, Search, Sidebar } from '../../components';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import PlayListContainer from './PlayListContainer';
function PlayList() {
    const [{
        allSongs, user , listFauvorites , listPlayList
    },dispath] = useStateValue()
    const [playlistAll, settPlaylistAll] = useState([])
    useEffect(()=>{
        let getAllPlaylist = user.user.playlist.map(x => allSongs.find(y => y._id === x))
        settPlaylistAll(getAllPlaylist)

        const getdata = () => {
            getFavourites(user.user._id).then((data) => {
                console.log('datalist',data.user.playlist)
                dispath({
                    type : actionType.SET_All_PLAYLIST,
                    listPlayList : data.user.playlist,
                })
            })
        }

        if(!listPlayList){
            getdata()
        }else {
            dispath({
                type : actionType.SET_All_PLAYLIST,
                listPlayList : [],
            })
            getdata()
        }
    },[])
    

    return ( 
        <div className='flex'>
            <Sidebar/>
            <div className="p-5 text-2xl font-semibold flex-1 h-screen">
                
                {/* header */}
                    <div className=" w-full p-4 md:py-2 md:px-3 flex items-center">
                        <Search/>
                        <ButtonUser/>
                    </div>
                    <h2 className="font-mono text-3xl text-gray-500">
                    PlayList Page
                    </h2>

                    {listPlayList && <div className='grid gap-y-6 pt-6'>
                        <PlayListContainer data={listPlayList} />
                    </div>}
                </div>
        </div>
     );
}

export default PlayList;
