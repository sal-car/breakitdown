import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {toggleCompleted} from '../../api-service'


export const Task = function ({projects, task, setTasks, tasks}) {

    const parseTime = function () {
        const date = new Date(task.date)
        const mins = String(date.getMinutes()).padStart(2, '0')
        const hours = date.getHours()
        return `${hours}:${mins}`
    }

    const getParentProject = function (id) {
        const project = projects.find((project) => project.id === task.parent);
        return project;
    }

    const handleCheckChange = function (id) {
        saveCompletedStatus(task)
        // console.log(tasks)
    }

    const saveCompletedStatus = async function () {
        try {
            console.log(task.id)
            const result = await toggleCompleted(task);
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="Task">
            <div className="task-left">
                {
                    task.completed === true ? 
                    <Checkbox defaultChecked onChange={() => handleCheckChange(task.id)} checkedIcon={<CheckCircleIcon/>} color="success"/>
                    :
                    <Checkbox onChange={() => handleCheckChange(task.id)} checkedIcon={<CheckCircleIcon/>} color="success"/>
                }
            <h3>{task.project}</h3>
            <p>{getParentProject(task.parent).project}</p>
            </div>
            <p>{parseTime(task.date)}</p>
        </div>
    )
}