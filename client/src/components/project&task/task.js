import React, {useEffect, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {toggleCompleted} from '../../api-service';
import {formatDate} from '../../utils/dateformatting'

export const Task = function ({projects, task, setProjects}) {
    const [completed, setCompleted] = useState(false);

    // Helper to get the parent the task belongs to - used to set the completed status 
    // of the entire project when all tasks are done
    const getParentProject = function () {
        const project = projects.find((project) => project.id === task.parent);
        return project;
    };

    // When projects or current task is updated, check if it's completed or not and reflect that in the state of the task
    useEffect(() => {
        const getCompletedStatus = function () {
            return task.completed === true ? 
            true
            : 
            false
        };

        setCompleted(getCompletedStatus())
    }, [projects, task]);

    // When user clisks on the completed checkbox, toggle the task's completed property
    const handleCheckChange = function (taskId) {
        const parentProject = getParentProject(taskId)

        const updatedTasks = parentProject.tasks.map((task) => {
            if (task.id === taskId) {
                task.completed = !task.completed;
            }
            return task;
        });

        
        const updatedProjects = projects.map((project) => {
            if (project.id === parentProject.id) {
                return {
                    ...project, 
                    tasks: updatedTasks
                };
            } else {
                return project;
            }
            });

        saveCompletedStatus(task)
        setProjects([...updatedProjects]);
    }       

    const saveCompletedStatus = function () {
        try {
            toggleCompleted(task);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="Task bg-white/80 border rounded-3xl px-2 py-2">
            <div className="top  flex items-center justify-between">
                <div className="left flex items-center">
                        <Checkbox checked={completed} onChange={() => handleCheckChange(task.id)} checkedIcon={<CheckCircleIcon/>} color="success"/>
                    <h3 className="text-gray-800 text-lg font-semibold ml-2 mr-2">{task.project}</h3>

                </div>
                <p className="mr-5 font-semibold text-gray-500 ">{ `${formatDate(task, false)}  ${formatDate(task, true)}` }</p>
            </div>
            <div className="bottom ml-14 mb-1">
                <p className="text-sm text-gray-500">{getParentProject(task.parent).project}</p>
            </div>
        </div>
    )
}