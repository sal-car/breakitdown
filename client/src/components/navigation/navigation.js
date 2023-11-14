import React  from 'react';
import { Navbar } from './navbar';


export const Navigation = function ({toggleCreateModal, openProjectDashboard, setOpenProjectDashboard, openTaskDashboard, setOpenTaskDashboard}) {

    return (
        <div className="Navigation h-20 mb-8 pb-16 pt-0 ">
            <header className="header flex justify-between items-center pt-5">
                <div className="left-header flex">
                <Navbar
                openProjectDashboard={openProjectDashboard} 
                setOpenProjectDashboard={setOpenProjectDashboard}
                openTaskDashboard={openTaskDashboard} 
                setOpenTaskDashboard={setOpenTaskDashboard}
                ></Navbar>
                </div>
                <button className="bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-14" onClick={toggleCreateModal}>New project</button>
            </header>
        </div>
    )

}