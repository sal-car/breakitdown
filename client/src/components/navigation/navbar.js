import React  from 'react';

export const Navbar = function ({setOpenProjectDashboard, setOpenTaskDashboard}) {

    const goToTaskDashboard = function () {
        setOpenProjectDashboard(false)
        setOpenTaskDashboard(true)
    }

    const goToProjectDashboard = function () {
        setOpenProjectDashboard(true)
        setOpenTaskDashboard(false)

    }

    return (
        <div className="side-navbar ml-5">
            <ul className="nav-list  flex justify-around mb-3">
                <li className="nav-list-item text-lg text-slate-900 p-5 hover:bg-white/50 rounded-lg grow justify-center flex">
                    <button onClick={goToProjectDashboard} className="nav-option font-semibold">Projects</button>
                </li>
                <li className="nav-list-item text-lg text-slate-900 p-5 hover:bg-white/50 rounded-lg grow justify-center flex">
                    <button onClick={goToTaskDashboard} className="nav-option font-semibold">Tasks</button>
                </li>
                <li className="nav-list-item text-lg text-slate-900 p-5 hover:bg-white/50 rounded-lg grow justify-center flex">
                    <button className="nav-option font-semibold">Profile</button>
                </li>
                    <li className="nav-list-item text-lg text-slate-900 p-5 hover:bg-white/50 rounded-lg grow justify-center flex">
                    <button className="nav-option font-semibold">Settings</button>
                </li>
            </ul>
        </div>
    )
}