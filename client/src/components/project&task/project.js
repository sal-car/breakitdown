import React, {useState, useEffect} from "react";
import {toggleCompleted} from '../../api-service';
import CloseIcon from '@mui/icons-material/Close';
import { ProjectInfo } from "./project-info";

export const Project = function ({handleDeleteClick, project, projects, setProjects}) {
    const [openProjectInfo, setOpenProjectInfo] = useState(false)

    const convertToTitleCase = function (str) {
        if (!str) {
            return ""
        }
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
      }

      useEffect(() => {
        calculateProgress()
      }, [project])

      useEffect(() => {
        setProjectAsCompleted()
      }, [])


    const calculateProgress = function () {
        let tasks = 0;
        let completedTasks = 0;

        project.tasks.forEach((task) => {
            tasks++
            if (task.completed === true) {
                completedTasks++
            }
        })

        return completedTasks === 0 ? '1%' : `${(completedTasks / tasks) * 100}%`
    }

    const setProjectAsCompleted = function () {
        const progress = calculateProgress()
        if (progress === '100%') {
            project.completed = true;
            setProjects(() => {
                return [...projects.map((proj) => {
                    if (proj.id === project.id) {
                        return {
                            ...project,
                            completed: true
                        };
                    } else {
                        return proj;
                    }
                })]
            });
        toggleCompleted(project)
        }
    }


    return (
        <div className="bg-white	 shadow-md border flex flex-col rounded-xl px-1 w-70 pb-5 h-fit max-h-[220px] min-h-[270px] min-w-[300px]">
            {openProjectInfo &&
            <ProjectInfo project={project} projects={projects} setProjects={setProjects} setOpenProjectInfo={setOpenProjectInfo}></ProjectInfo>
            }
            <div className="flex justify-between pl-4 pr-1 mb-3">
                <h2 className="tracking-tight text-xl mt-4 font-medium leading-tight text-gray-800" >
                    {convertToTitleCase(project.project)}
                </h2>
                <button className="align-top" onClick={(handleDeleteClick)}>
                    <CloseIcon style={{color: "#b5b1b1"}} className=""></CloseIcon>
                </button>
            </div>
            <div className=" h-0.5 bg-black/40 rounded-lg w-full"></div>
            <div onClick={() => setOpenProjectInfo(true)} className="project-info cursor-pointer justify-between grow px-5 flex flex-col">
                {project.tasks.length ?
                    <div className="next-card mt-6 mb-5 ">
                        <p className="next font-xl mb-0 font-semibold tracking-wider text-gray-800">Next</p>
                        <p className="next-task text-gray-800 m-0">{project.tasks.find((task) => !task.completed)?.project || 'Nothing, all done! 🌴'}</p>
                    </div>
                :
                project.description ? 
                    <div className="mb-5 mt-6">
                            <p className="font-xl font-semibold tracking-wider text-gray-800">Description</p>
                            <p>{project.description}</p>
                    </div>
                :
                    null
                }
                <div style={{width: `${calculateProgress()}` }} className= "bg-green-500 rounded-full h-2.5 justify-self-end">
            </div>
            </div>
        </div>
    )
}

// onClick={onProjectClick}