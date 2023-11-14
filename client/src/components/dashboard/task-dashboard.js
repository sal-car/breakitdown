import { useEffect, useState } from "react"
import {Task} from '../project&task/task'
import React  from 'react';
import { TimelineBox } from "./timeline";
import { FilterBy } from "./filter-by-date";
import {filterProjectsBy} from "../../utils/filtering"
// import {sortByDate} from '../../utils/sorting'


export const TaskDashboard = function ({setProjects, projects}) {
    const [tasks, setShowingTasks] = useState([])
    const [filter, setFilter] = useState('all')
    const [projectFilter, setProjectFilter] = useState('all')
    
    useEffect(() => {
        const taskList = projects.filter((project) => project.tasks?.length).map((project) => project.tasks).flat() // FIXME: make DRY
        const filteredByDate = filterProjectsBy(filter, taskList)
        const filteredByProject = filterProjectsBy(projectFilter, filteredByDate, projects)
        setShowingTasks([...filteredByProject])
    }, [filter, projectFilter, projects])


    return (
        <div className="main grid grid-cols-12 w-full h-full">
            <div className="TaskDashboard rounded-3xl p-5 col-span-8 ml-5 h-fit">
                <div className="info">
                    <div className="header flex justify-end items-center gap-10 mb-6">
                        {/* <h1 className="text-2xl font-semibold text-gray-800">Tasks</h1> */}
                        <div className="filtering flex items-center gap-5">
                            <FilterBy setFilter={setFilter} ></FilterBy>
                            <form>
                                <select name="project-select" className=" p-2 font-semibold bg-white/80 text-gray-900 rounded-lg outline-none w-full " onChange={(e) => setProjectFilter(e.target.value)}>
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
                            <Task key={index} projects={projects} task={task} setProjects={setProjects}></Task>
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