import React from "react";
import { useEffect } from "react";
import {toggleCompleted} from '../../api-service';
import CloseIcon from '@mui/icons-material/Close';

export const Project = function ({handleDeleteClick, project, projects, setProjects}) {

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
        <div  className="bg-white/80 shadow-md flex flex-col rounded-lg w-70 pb-5 h-fit max-h-[220px] min-h-[210px]">
            {/* <div className=" h-2 bg-[#779AF6] rounded-sm w-full"></div> */}
            <div className="flex justify-between px-4 mt-4 mb-3">
                <h2 className="tracking-tight text-xl font-medium leading-tight text-gray-800" >
                    {convertToTitleCase(project.project)}
                </h2>
                <button className="align-top" onClick={(handleDeleteClick)}>
                    <CloseIcon style={{color: "#b5b1b1"}} className=""></CloseIcon>
                </button>
            </div>
            <div className="project-info justify-between grow px-5 flex flex-col">
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