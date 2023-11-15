import React  from 'react';

export const Navbar = function ({setOpenProjectDashboard, setOpenTaskDashboard, setOpenSettings}) {

    const goToTaskDashboard = function () {
        setOpenSettings(false)
        setOpenProjectDashboard(false)
        setOpenTaskDashboard(true)
    };

    const goToProjectDashboard = function () {
        setOpenTaskDashboard(false)
        setOpenSettings(false)
        setOpenProjectDashboard(true)
    };

    const goToSettings = function () {
        setOpenProjectDashboard(false)
        setOpenTaskDashboard(false)
        setOpenSettings(true)
    };

    return (
        <div className="side-navbar ml-10">
            <ul className="nav-list  flex justify-around mb-3">
                <li className="nav-list-item bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">
                    <button onClick={goToProjectDashboard} className="nav-option font-semibold">Projects</button>
                </li>
                <li className="nav-list-item bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">
                    <button onClick={goToTaskDashboard} className="nav-option font-semibold">Tasks</button>
                </li>
                <li className="nav-list-item bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">
                    <button className="nav-option font-semibold">Profile</button>
                </li>
                    <li className="nav-list-item bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">
                    <button onClick={goToSettings} className="nav-option font-semibold">Settings</button>
                </li>
            </ul>
        </div>
    )
}