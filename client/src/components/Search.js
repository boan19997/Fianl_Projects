import React, { useState }  from 'react'

function Search() {

    const [isFoucs, setIsFoucs] = useState(false)

    return ( 
        <input 
        className={`w-80 px-4 py-2 border ${isFoucs ? "border-gray-900 shadow-md" : "border-gray-500"} rounded-3xl bg-transparent
        outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
        type="text" 
        placeholder="Search here..."
        onBlur={() => {setIsFoucs(false)}}
        onFocus={() => setIsFoucs(true)}
        /> 
    );
}

export default Search;
