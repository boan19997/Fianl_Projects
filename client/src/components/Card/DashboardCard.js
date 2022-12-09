import React from "react";
import { bgColors } from '../../utils/styles'

function DashboardCard({icon, name, count}) {

    //hàm random màu
    const bg_Color = bgColors[parseInt(Math.random() * bgColors.length)]


    return ( 
        <div style={{background : `${bg_Color}`}} className='p-4 w-40 gap-3 h-auto my-4 rounded-lg shadow-md flex flex-col items-center justify-center'>
            {icon}
            <p className="text-xl text-textColor font-semibold">{name}</p>
            <p className="text-xl text-textColor ">{count}</p>
        </div>
     );
}

export default DashboardCard;