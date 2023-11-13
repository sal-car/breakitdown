import React  from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';


export const Navigation = function ({handleNavbarClick, toggleCreateModal}) {


    return (
        <div className="Navigation h-20 mb-10 pt-2">
            <header className="header flex justify-between items-center pt-5">
                <div className="left-header flex">
                    <button onClick={handleNavbarClick} className="nav-icon flex gap-2 flex-col ml-8 ">
                        <MenuRoundedIcon style={{ color: "grey", fontSize: "40px" }}></MenuRoundedIcon>
                    </button>
                    <h2 className="logo text-xl font-sans font-semibold text-black/40 mr-2">
                        {/* breakitdown */}
                    </h2>
                </div>
                <div className="middle-header">
                    <input type="text" placeholder="Search" className="search-bar w-[750px] rounded-lg h-8 p-2" />
                </div>
                {/* <div className="right-header  "> */}
                    <button className="bg-transparent hover:bg-[#F9D74D]  text-[#F9D74D] font-semibold hover:text-white py-3 px-5 border border-[#F9D74D]  hover:border-transparent rounded-md  mx-5 mr-14" onClick={toggleCreateModal}>New project</button>
                {/* </div> */}
            </header>
        </div>
    )

}