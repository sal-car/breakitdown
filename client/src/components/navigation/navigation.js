import React  from 'react';
import { Navbar } from './navbar';


export const Navigation = function ({toggleCreateModal, setOpenProjectDashboard, setOpenTaskDashboard, setOpenSettings}) {

    return (
        <div className="Navigation h-20 mb-8 pb-16 pt-0 ">
            <header className="header flex justify-between items-center pt-5">
                <div className="left-header flex">
                <Navbar
                setOpenProjectDashboard={setOpenProjectDashboard}
                setOpenTaskDashboard={setOpenTaskDashboard}
                setOpenSettings={setOpenSettings}
                ></Navbar>
                </div>
                <button className="settings-button" onClick={toggleCreateModal}>New project</button>
            </header>
        </div>
    )

}