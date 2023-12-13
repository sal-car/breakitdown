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
        <div className="ml-10">
            <ul className="flex justify-around mb-3">
                <li className="settings-button">
                    <button onClick={goToProjectDashboard}>Projects</button>
                </li>
                <li className="settings-button">
                    <button onClick={goToTaskDashboard}>Tasks</button>
                </li>
                <li className="settings-button">
                    <button>Profile</button>
                </li>
                    <li className="settings-button">
                    <button onClick={goToSettings}>Settings</button>
                </li>
            </ul>
        </div>
    )
}