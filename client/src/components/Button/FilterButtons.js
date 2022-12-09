import { motion } from "framer-motion";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider"

function FilterButtons({ filterData, flag}) {

    const [filterName ,setFilterName] = useState(null)
    const [filterMenu , setFilterMenu] = useState(false)

    const [ { artistFilter, albumFilter, filterTerm, languageFilter }, dispatch] = useStateValue()

    const updateFilterButton = (name) => {
        setFilterMenu(false)
        setFilterName(name)

        if (flag === "Artist") {
            dispatch({ type: actionType.SET_ARTISIT_FILTER, artistFilter: name })
        }

        if (flag === "Albums") {
            dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name })
        }

        if (flag === "Language") {
            dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name })
        }

        if (flag === "Category") {
            dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name })
        }
    }

    return ( 
        <div className="border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400">
            <p className="text-base tracking-wide text-textColor flex items-center gap-2" onClick={() => setFilterMenu(!filterMenu )}>
                {!filterName && flag}
                {filterName && (

                    // giới hạn số lượng chữ hiển thị ra ngoài nếu vượt hơn 15 kí tự sẽ hiện 3 chấm
                    <>
                        {filterName.length > 15 ? `${filterName.slice(0, 15)}...` : filterName}
                    </>
                )}
                <IoChevronDown className={`text-base text-textColor duration-150 transition-all ease-in-out 
                ${filterMenu ? "rotate-180" : "rotate-0"}`} />
            </p>

            {filterData && filterMenu && (
                <motion.div 
                    className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0"
                    // này là hiệu ứng 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                >
                    {filterData?.map(data => (
                        <div 
                            className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
                            key={data.name}
                            onClick={() => updateFilterButton(data.name)}
                        > 
                            {(flag === 'Artist' || flag ==='Albums') && (
                                <img
                                    className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                                    src={data.imageURL} 
                                />
                            )}

                            <p className="w-full">
                                {data.name.length > 15 ? `${data.name.slice(0, 15)}...` : data.name}
                            </p>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
     );
}

export default FilterButtons;