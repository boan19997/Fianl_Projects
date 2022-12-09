import React from "react"
import { useStateValue } from '../../context/StateProvider'
import UserCard from "../../components/Card/UserCard";

function DashboardUsers() {

    const [{ allUsers }] = useStateValue();

    return ( 

    // from bảng user
    <div className="w-full p-4 flex items-center justify-center flex-col">
        <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
            <div className="absolute top-4 left-4">
                <p className="text-sm font-bold">
                    Count: <span className="text-xl font-bold text-textColor">{allUsers?.length}</span>
                </p>
            </div>

            {/* bảng hiển thị tất cả user */}
            <div className="w-full min-w-[750px] flex items-center justify-between">
                <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>

                <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>

                <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>

                <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>

                <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Created</p>
                
                <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>
            </div>

            {/* body của bảng */}
            {
                allUsers && (
                    allUsers?.map((data, i) => (
                        <UserCard data={data} index={i}/>
                    ))
                )
            }
        </div>
    </div> 
    );
}

export default DashboardUsers;