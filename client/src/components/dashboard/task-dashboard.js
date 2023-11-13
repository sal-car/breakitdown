import { useEffect, useState } from "react"
import {Task} from '../project&task/task'

export const TaskDashboard = function ({setProjects, projects}) {
    const [tasks, setTasks] = useState([])
    const [Tasks, setShowingTasks] = useState([])
    
    useEffect(() => {
        const taskList = projects.filter((project) => project.tasks?.length).map((project) => project.tasks).flat()
        setTasks([...taskList])
    }, [projects])



    const filterByProject = function (e) {
        const selectedOption = e.target.value;
        const taskList = projects.filter((project) => project.tasks?.length).map((project) => project.tasks).flat() // FIXME: make DRY
        
        if (selectedOption === 'all') setTasks([...taskList]);
        else {
            const projectsTasks = taskList.filter((task) => task.parent === selectedOption);
            setTasks([...projectsTasks])
        }
    }



    return (
        <div className="TaskDashboard  bg-white/60 rounded-3xl shadow-lg p-5 col-span-9 ml-5 h-fit w-2/3">
            <div className="info">
                <div className="header flex justify-between gap-10 mb-5">
                    <h1 className="text-2xl font-semibold text-gray-800">Tasks</h1>
                    <form>
                        {/* <label for="project-select" className="font-semibold tracking-wide">Filter by project</label> */}
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
            <div className="list-dashboard flex flex-col gap-5">
            { tasks.length ? 
                tasks.map((task, index) =>{
                    return (
                        <Task key={index} projects={projects} task={task} setTasks={setTasks} tasks={tasks} setProjects={setProjects}></Task>
                    )
                })
                :
                <div className="flex justify-center">
                    <p>Woops, no tasks here!</p>
                </div>
            }
            </div>
        </div>
    )
}

// flex flex-col gap-5 mt-10