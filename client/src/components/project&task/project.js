import React from "react";
import { useEffect } from "react";

export const Project = function ({project}) {

    const convertToTitleCase = function (str) {
        if (!str) {
            return ""
        }
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
      }

      useEffect(() => {
        calculateProgress()
        console.log('progress, ', calculateProgress())
      }, [project])


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

    return (
        <div  className="bg-white/80 shadow-md  rounded-lg w-70 pb-5 h-fit">
            <div className="flex justify-between px-4 mb-3 py-0 pt-3">
                <h2 className="tracking-tight text-xl pt-3 font-medium leading-tight text-gray-800" >{convertToTitleCase(project.project)}</h2>
                {/* <button className="align-top" onClick={(handleDeleteClick)}>X</button> */}
            </div>
            {/* <div class="border-b-2 border-[#0000002d] pt-0 px-0 text-black w-full"></div> */}
            <div className="project-info px-5 flex flex-col">
                
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
                {/* <div className={`bg-green h-2.5 rounded-full w-2/3`}></div> */}
            </div>

            </div>
        </div>
    )
}

// onClick={onProjectClick}