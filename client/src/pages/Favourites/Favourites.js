import React, { useEffect, useState } from 'react'
import { getAllSongs, getFavourites } from '../../api';
import { ButtonUser, Search, Sidebar } from '../../components';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import FavouritesContainer from './FavouritesContainer';

function Favourites() {
    const [{
        allSongs, user , listFauvorites
    },dispath
    ] = useStateValue()
    useEffect(()=>{
        if(!listFauvorites){
            getFavourites(user.user._id).then((data) => {
                console.log('datafavorite',data.user.songs)
                dispath({
                    type : actionType.SET_All_FAVORITE,
                    listFauvorites : data.user.songs,
                })
            })
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
                    Favorites Page
                    </h2>
                    <div className='grid gap-y-6 pt-6'>
                        <FavouritesContainer data={listFauvorites} />
                    </div>
                </div>
        </div>
     );
}

export default Favourites;
