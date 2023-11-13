import React  from 'react';


export const Navigation = function ({handleNavbarClick, toggleCreateModal}) {


    return (
        <div className="Navigation h-20">
            <header className="header flex justify-between items-center pt-5">
                <div className="left-header flex">
                    <button onClick={handleNavbarClick} className="nav-icon flex gap-2 flex-col mx-5 ">
                        <div className="nav-line w-10 bg-white h-1  "></div>
                        <div className="nav-line w-10 bg-white h-1 "></div>
                        <div className="nav-line w-10 bg-white h-1 "></div>
                    </button>
                    <h2 className="logo text-xl font-sans font-semibold text-black/40 mr-2">
                        {/* breakitdown */}
                    </h2>
                </div>
                <div className="middle-header">
                    <input type="text" placeholder="Search" className="search-bar w-[750px] rounded-lg h-8 p-2" />
                </div>
                {/* <div className="right-header  "> */}
                    <button className="bg-transparent hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border border-violet-900 hover:border-transparent rounded  mx-5 mr-10" onClick={toggleCreateModal}>New project</button>
                {/* </div> */}
            </header>
        </div>
    )

}