import { useEffect, useState } from "react"
import {Task} from '../project&task/task'

export const TaskDashboard = function ({projects}) {
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
        <div className="TaskDashboard Dashboard">
            <div className="info">
            <h1 className="dashboard-header">Tasks</h1>
            <form>
                <select onChange={filterByProject}>
                    <option value="all">All tasks</option>
                    { projects.map((project) => {
                           return <option value={project.id}>{project.project}</option> 
                    })
                    }
                </select>
            </form>
            </div>
            <div className="list-dashboard">
            { tasks.length ? 
                tasks.map((task, index) =>{
                    return (
                        <Task key={index} projects={projects} task={task} setTasks={setTasks} tasks={tasks}></Task>
                    )
                })
                :
                <div></div>
            }
            </div>
        </div>
    )
}