import { useEffect, useState } from "react"
import {Task} from '../project&task/task'
import React  from 'react';
import { TimelineBox } from "./timeline";
import { FilterByDate } from "./filter-by-date";

/* 

        const fetchOldProjects = async function () {
            try {
            const response = await getProjects();
            console.log('RES', response)
            setProjects([...response]);
            } catch (error) {
            console.log("Error when rendering projects: ", error);
            }
        }
*/
export const TaskDashboard = function ({setProjects, projects}) {
    const [tasks, setTasks] = useState([])
    const taskList = projects.filter((project) => project.tasks?.length).map((project) => project.tasks).flat() // FIXME: make DRY

    
    useEffect(() => {
        setTasks([...taskList])


    }, [projects])



    const filterByProject = function (e) {
        const selectedOption = e.target.value;
        
        if (selectedOption === 'all') setTasks([...taskList]);
        else {
            const projectsTasks = taskList.filter((task) => task.parent === selectedOption);
            setTasks([...projectsTasks])
        }
    }



    return (
        <div className="main grid grid-cols-12 w-full h-full">
            <div className="TaskDashboard  bg-white/60 rounded-3xl shadow-lg p-5 col-span-8 ml-5 h-fit">
                <div className="info">
                    <div className="header flex justify-between items-center gap-10 mb-5">
                        <h1 className="text-2xl font-semibold text-gray-800">Tasks</h1>
                        <div className="filtering flex items-center gap-5">
                            <FilterByDate setShowingProjects={setTasks} projects={taskList} ></FilterByDate>
                            <form>
                                <select name="project-select" className="bg-white/0 font-semibold text-gray-900 rounded-lg outline-none  w-full " onChange={filterByProject}>
                                    <option value="all">All projects</option>
                                    { projects.map((project, index) => {
                                        return <option key={index} value={project.id}>{project.project}</option> 
                                    })
                                    }
                                </select>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="list-dashboard flex flex-col gap-5">
                { tasks.length ? 
                    tasks.map((task, index) =>{
                        return (
                            <Task key={index} projects={projects} task={task} setTasks={setTasks} tasks={tasks} setProjects={setProjects}></Task>
                        )
                    })
                    :
                    <div className="flex justify-center">
                    <p className="font-semibold text-lg">No tasks ☹️</p>
                  </div>
                }
                </div>

            </div>
            <div className="col-span-4 mr-5">
                <TimelineBox  projects={tasks}></TimelineBox>
            </div>
        </div>
    )
}

// flex flex-col gap-5 mt-10