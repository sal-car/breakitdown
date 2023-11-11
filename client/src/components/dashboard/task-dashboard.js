import { useEffect, useState } from "react"
import {Task} from '../project&task/task'

export const TaskDashboard = function ({projects}) {
    const [tasks, setTasks] = useState([])
    
    useEffect(() => {
        const taskList = projects.filter((project) => project.tasks?.length).map((project) => project.tasks).flat()
        setTasks([...taskList])
    }, [projects])

    return (
        <div className="TaskDashboard">
            <h1 className="dashboard-header">Tasks</h1>
            <div className="list-dashboard">
            { tasks.length ? 
                tasks.map((task) =>{
                    return (
                        <Task projects={projects} task={task}></Task>
                    )
                })
                :
                <div></div>
            }
            </div>
        </div>
    )
}