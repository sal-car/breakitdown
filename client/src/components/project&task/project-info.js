import React from "react"
import { Task } from "./task"
import CloseIcon from '@mui/icons-material/Close';
import {formatDate} from '../../utils/dateformatting';

export const ProjectInfo = function ({project, projects, setProjects, setOpenProjectInfo}) {

    return (
        <div className='CreateProject overflow-y-auto overflow-x-hidden min-h-[100vh] fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-gray-600/50'>	
            <div className="relative p-4 h-fit w-1/2 top-[10vh] mx-auto">
                <div className="relative h-fit bg-white rounded-xl shadow px-10 py-8 flex flex-col">
                    <div className="ProjectInfo h-full flex flex-col gap-10">
                        <div className="header">
                            <h1 className=" text-2xl font-semibold text-gray-800 justify-self-start">{project.project}</h1>
                            <button onClick={() => setOpenProjectInfo(false)} className="close-modal">
                                <CloseIcon style={{color: "#b5b1b1"}} className="absolute top-[15px] right-[15px]"></CloseIcon>
                            </button>
                        </div>
                        <div className="description ml-1 grow justify-self-middle">
                            <h1 className=" text-xl font-semibold text-gray-800">Description</h1>
                            {
                                project.description ?
                                        <p>{project.description}</p>
                                : 
                                <p className="mt-2 text-gray-800 font-semibold">Very empty here</p>
                            }
                        </div>
                        <div className="date  ml-1 grow justify-self-middle">
                            <h1 className=" text-xl font-semibold text-gray-800">Due date</h1>
                            <p>{formatDate(project, false)} at {formatDate(project, true)}</p>
                        </div>
                        <div className="tasks ml-1 grow justify-self-end flex flex-col justify-end">
                            <h1 className=" text-xl  font-semibold text-gray-800"> Tasks</h1>
                            {
                                project.tasks &&
                                    project.tasks.map((task, index) => {
                                        return (
                                            <div key={index} className="mt-2">
                                                <Task key={index} projects={projects} task={task} setProjects={setProjects}></Task>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )

}

