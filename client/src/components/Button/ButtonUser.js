import { getAuth } from 'firebase/auth'
import React, { useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCrown } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import {getrole} from '../../api'

import { app } from '../../config/firebase.config'
import { useStateValue } from '../../context/StateProvider'
import images from '../../assets/images'

function ButtonUser() {

    //để lấy tên user từ gg đặt sẵn 
    const [{user}, dispatch] = useStateValue()
    const [isMenu, setIsMenu] = useState(false)
    const [name, setname] = useState('')
    
    const navigate = useNavigate()

    useEffect(() => {
        const token = window.localStorage.getItem("tokene")
        getrole(token).then(data => {setname(data.data.name);}).catch()
    },[])
    
    const logOut = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false")
            window.localStorage.removeItem("tokene")
            navigate("/login", {replace : true})
        }).catch((e) => console.log(e));
    }

    return ( 
        <div 
            onMouseDown={() => setIsMenu(true)}
            onMouseLeave={() => setIsMenu(false)}
            className="flex items-center ml-auto cursor-pointer gap-2 relative">
            <img src={images.user_img} className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg" alt="" />
            <div className="flex flex-col">
                {/* lấy name từ tên gg */}
                <p className="text-textColor text-lg hover:text-headingColor font-semibold ">{user?.user?.name||name}</p>
                <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">Premium Member.
                    <FaCrown className="text-sm -ml-1 text-yellow-500"/>
                </p>
            </div>

            {isMenu && (
                    <motion.div 
                    initial={{opacity : 0, y : 50 }}
                    animate={{opacity : 1, y : 0}}
                    exit={{opacity : 0, y : 50}}
                    className="absolute z-10  flex flex-col p-3 top-12 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm">
                        <NavLink to={'/useProfile'}>
                            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">Profile</p>
                        </NavLink>

                        <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out" onClick={logOut}>Sign Out</p>
                    </motion.div>
                )}
        </div>
     );
}

export default ButtonUser;