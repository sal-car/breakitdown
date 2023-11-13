import React  from 'react';

export const Navbar = function ({setOpenNavbar, setOpenProjectDashboard, setOpenTaskDashboard}) {

    const goToTaskDashboard = function () {
        setOpenProjectDashboard(false)
        setOpenTaskDashboard(true)
        setOpenNavbar(false)
    }

    const goToProjectDashboard = function () {
        setOpenProjectDashboard(true)
        setOpenTaskDashboard(false)
        setOpenNavbar(false)

    }

    return (
        <div className="side-navbar">
            <ul className="nav-list flex mb-5">
                    {/* <h2 className="nav-header" >Dashboard</h2> */}
                <li className="nav-list-item hover:bg-white/50 p-5 px-16 grow justify-center flex">
                    <button onClick={goToProjectDashboard} className="nav-option font-semibold">Projects</button>
                </li>
                <li className="nav-list-item p-5 hover:bg-white/50 rounded-lg grow justify-center flex">
                    <button onClick={goToTaskDashboard} className="nav-option font-semibold">Tasks</button>

                </li>
                    {/* <h2 className="nav-header" >Create</h2> */}
                <li className="nav-list-item p-5 hover:bg-white/50 rounded-lg grow justify-center flex">
                <button className="nav-option font-semibold">Project</button>
                </li>
                <li className="nav-list-item p-5 hover:bg-white/50 rounded-lg grow justify-center flex">
                <button className="nav-option font-semibold">Task</button>
                </li>
                    {/* <h2 className="nav-header" >Home</h2> */}
                <li className="nav-list-item p-5 hover:bg-white/50 rounded-lg grow justify-center flex">
                <button className="nav-option font-semibold">Profile</button>
                </li>
                <li className="nav-list-item p-5 hover:bg-white/50 rounded-lg grow justify-center flex">
                <button className="nav-option font-semibold">Settings</button>
                </li>
            </ul>
        </div>
    )
}