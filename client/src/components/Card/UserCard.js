import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import moment from 'moment' //thư viện này để format ngày tháng cho đẹp

import { changingUserRole, getAllUsers, removeUser } from "../../api";
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'

function UserCard({data, index}) {

    //phần này giúp cho điều chỉnh role
    const [{ user, allUsers }, dispatch] = useStateValue();

    const [isUserRoleUpdate, setIsUserRoleUpdate] = useState(false)

    const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY")

    useEffect(() => {
        if (!allUsers) {
            getAllUsers().then((data) => {
                dispatch({
                    type : actionType.SET_ALL_USERS,
                    allUsers : data.data
                })
            })
        }
    }, [])

    //update user Role
    const updateUserRole = (userId, role) => {
        setIsUserRoleUpdate(false)
        changingUserRole(userId, role).then((res) => {
            if (res) {
                getAllUsers().then((data) => {
                    dispatch({
                        type : actionType.SET_ALL_USERS,
                        allUsers : data.data
                    })
                })
            }
        })
    }

    //delete user
    const deleteUser = (userId) => {
        removeUser(userId).then((res) => {
            if (res) {
                getAllUsers().then((data) => {
                    dispatch({
                        type : actionType.SET_ALL_USERS,
                        allUsers : data.data
                    })
                })
            }
        })
    }
    return ( 
        <motion.div key={index} className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
        >
            {/* delete user */}
            {data._id !== user?.user._id && (
                <motion.div whileTap={{scale : 0.75}} className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200" onClick={() => deleteUser(data._id)}>
                    <MdDelete className="text-xl text-red-400 hover:text-red-500"/>
                </motion.div>
            )}


            {/* user image */}
            <div className="w-275 min-w-[160px] flex items-center justify-center">
                <img src={data.imageURL} referrerPolicy="no-referrer" alt="" className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"/>
            </div>

            {/* user name */}
            <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.name}</p>
            <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email}</p>
            <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email_verified ? "True" : "False"}</p>
            <p className="text-base text-textColor w-275 min-w-[160px] text-center">{createdAt}</p>

            {/* thay đổi role ngay tên bảng (kiểu dống phân quyền) */}
            <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
                <p className="text-base text-textColor text-center">{data.role}</p>
                {
                    data._id !== user?.user._id && (
                        // motion whileTap={{scale : 0.75}} là hiệu ứng nhấp chuột 
                        <motion.p whileTap={{scale : 0.75}} className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md" onClick={() => setIsUserRoleUpdate(true)}>
                            {data.role === "admin" ? "Member" : "Admin"}
                        </motion.p>
                    )
                }

                {isUserRoleUpdate && (
                    <motion.div 
                        initial={{opacity : 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale : 0.5}}
                        className="absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md">
                        <p className="text-textColor text-[12px] font-semibold">
                            Are you sure, do you want to mark the user as <span>{data.role === "admin" ? "Member" : "Admin"}</span> ?
                        </p>

                        <div className="w-full flex items-center justify-center gap-4">
                            <motion.button whileTap={{scale : 0.75}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-green-300 text-black hover:bg-green-400" 
                            onClick={() => updateUserRole(data._id, data.role === "admin" ? "member" : "admin")}>
                                Yes
                            </motion.button>
                            <motion.button whileTap={{scale : 0.75}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-300 text-black hover:bg-red-400" onClick={() => setIsUserRoleUpdate(false)}>
                                No
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
     );
}

export default UserCard;
