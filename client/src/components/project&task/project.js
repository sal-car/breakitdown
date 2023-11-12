import { useEffect } from "react";

export const Project = function ({project, onProjectClick, handleDeleteClick}) {

    const convertToTitleCase = function (str) {
        if (!str) {
            return ""
        }
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
      }

      useEffect(() => {
        calculateProgress()
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
        console.log(`${completedTasks}/${tasks}`)
        return `${completedTasks.toString()}/${tasks.toString()}`
    }

    const test = '3/4'
    return (
        <div  className="bg-white/70 rounded-lg w-70 pb-5">
            <div className="flex justify-between px-4 mb-3 py-0 pt-3">
                <h2 className="tracking-tight text-xl pt-3 font-medium leading-tight text-black" >{convertToTitleCase(project.project)}</h2>
                {/* <button className="align-top" onClick={(handleDeleteClick)}>X</button> */}
            </div>
            {/* <div class="border-b-2 border-[#0000002d] pt-0 px-0 text-black w-full"></div> */}
            <div className="project-info px-5 ">
                
                {project.tasks.length ?
                <div className="next-card mt-6 mb-5 ">
                    <p className="next font-xl mb-0 font-semibold tracking-wider">Next</p>
                    <p className="next-task">{project.tasks[0].project}</p>
                </div>
                :
                <div></div>
                }

                <div className={ `w-${calculateProgress()} bg-gray-200 rounded-full h-2.5 dark:bg-gray-700`}>
                <div className={`bg-green h-2.5 rounded-full w-2/3`}></div>
                </div>

            </div>
        </div>
    )
}

// onClick={onProjectClick}