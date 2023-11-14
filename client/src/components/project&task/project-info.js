import React from "react"
import { Task } from "./task"
import CloseIcon from '@mui/icons-material/Close';

// IN PROGRESS

export const ProjectInfo = function ({project, projects, setProjects, setOpenProjectInfo}) {

    return (
        <div className='CreateProject overflow-y-auto overflow-x-hidden min-h-[100vh] fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-gray-600/50'>	
            <div className="relative p-4 h-fit w-1/2 top-25 mx-auto">
                <div className="relative h-fit bg-white rounded-xl shadow px-10 py-8 flex flex-col">
                    <div className="ProjectInfo h-full flex flex-col gap-10">
                        <div className="header">
                            <h1 className=" text-2xl font-semibold text-gray-800 justify-self-start">{project.project}</h1>
                            <button onClick={() => setOpenProjectInfo(false)} className="close-modal">
                                <CloseIcon style={{color: "#b5b1b1"}} className="absolute top-[15px] right-[15px]"></CloseIcon>
                            </button>
                        </div>
                        <div className="description ml-1 grow justify-self-middle">
                            <h1 className=" text-xl font-semibold text-gray-800"> Description</h1>
                            {
                                project.description ?
                                    <div className="project-info-description">
                                        <p>{project.description}</p>
                                    </div>
                                : 
                                <p className="mt-2 text-gray-800 font-semibold">Very empty here</p>
                            }
                        </div>
                        <div className="tasks ml-1 grow justify-self-end flex flex-col justify-end">
                            <h1 className=" text-xl  font-semibold text-gray-800"> Tasks</h1>
                            {
                                project.tasks &&
                                    project.tasks.map((task, index) => {
                                        return (
                                            <div key={index} className="mt-2">
                                                <Task projects={projects} task={task} setProjects={setProjects}></Task>
                                            </div>
                                        // <div key={index} className="project-info-task">
                                        //     <p className="text-gray-800 font-semibold ml-2 mr-2 my-2 py-2 rounded-3xl px-2 ">{task.project}</p>
                                        // </div>
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

