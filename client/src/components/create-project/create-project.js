import { useState } from "react";
import React  from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'
import getBreakdown, { sendToServer } from '../../api-service.js'
import {v4 as uuidv4} from 'uuid'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';


export const CreateProject = function ({toggleCreateModal, projects, setProjects}) {
    const [projectData, setprojectData] = useState({
        project: "",
        date: new Date(),
        description: "",
        id: uuidv4(),
        tasks: []
    });
    const [steps, setSteps] = useState([])

    // Creating a step
    // if the project is provided (from api), add it to project prop, otherwise initialise as empty
    const createStep = function () {
        const uuid = uuidv4()
        setSteps([...steps, {project: '', id: uuid, date: new Date(), parent: projectData.id, completed: false}])
        }


    const deleteStep = function (id) {
        setSteps(steps.filter((step) => step.id != id))
    }

    // Breaking the project down
    const breakItDown = async function () {
        // get data from apiservice
        try {
            const data = await getBreakdown(projectData)
            const newState = data.map((entry) => {
                const uuid = uuidv4()
                return {project: entry.project, id: uuid, date: new Date(), parent: projectData.id, completed: false}
            })
            setSteps([...steps, ...newState])
        } catch (error) {
            console.log(error)
        }
    }
    
    // Saving project
    const saveProject = function (e) {
        e.preventDefault()
        setProjects([...projects, {project: projectData.project, date: projectData.date, id: projectData.id, tasks: [...steps]}])
        sendToServer({...projectData, tasks: [...steps]})
        toggleCreateModal()
    }


    // Handling change in input fields
    const handleInputChange = function (event) {
        const name = event.target.name;
        const value = event.target.value;

        if (name == 'project-name') {
            setprojectData((prev) => ({...prev, project: value}));
        } 
        
        else if (name == 'project-description') {
            setprojectData((prev) => ({...prev, description: value}));

        } 
        
        else {
            setSteps(
                steps.map((step) => name == step.id ? {...step, project: value} : step)
            )
        }    
    }


    // Handling change in step date fields 
    const handleDateChange = function (date, id) {
        setSteps(steps.map((step) => step.id == id ? {...step, date: new Date(date)} : step));
    }


    return ( 
    <div className='CreateProject overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-gray-600/50'>	
        <div className="relative p-4 min-w-fit max-w-fit max-h-full top-24 mx-auto">
            <div className="relative bg-white rounded-xl shadow px-10 py-8 flex flex-col">
                <div className="header flex justify-between mb-12">
                    <h1 className="create-project-header text-2xl font-semibold">Create project</h1>
                    <button onClick={toggleCreateModal} className="close-modal">
                        <HighlightOffRoundedIcon color="inherit" fontSize="large" className="absolute  top-[-4px] right-[-4px]"></HighlightOffRoundedIcon>
                    </button>
                </div>
                <form onSubmit={saveProject} className="create-project-form">
                    <div className="input-area">
                        <div className="name-date flex gap-5 mr-3">
                            <div className="name flex flex-col gap-1 mb-8">
                                <label htmlFor="project-name" className="font-semibold tracking-wide">Project</label>
                                <input required type="text" className="project-name outline-none border p-2.5 rounded-lg w-[400px]" onChange={handleInputChange} name="project-name" value={projectData.project} placeholder="What's the goal?"/>
                            </div>
                            <div className="date-picker flex flex-col mb-12">
                                <label htmlFor="date" className="font-semibold tracking-wide mb-1">Deadline</label>
                                <DatePicker className="project-date outline-none border p-4 h-12 rounded-lg"closeOnScroll={true} showTimeSelect dateFormat="Pp"  selected={new Date(projectData.date)} onChange={(date) => setprojectData({...projectData, date: new Date(date)})} />
                            </div>

                        </div>
                        <div className="description flex flex-col gap-1 mb-10">
                            <label htmlFor="project-description" className=" font-semibold tracking-wide ">Description</label>
                            <textarea placeholder="Would you like to expand on that?" className="project-description h-28 outline-none border p-2.5 rounded-xl" onChange={handleInputChange} name="project-description" value={projectData.description}/>
                        </div>
                    </div> 
                </form>
                <div className="steps-container flex flex-col items-center gap-10 w-full ">
                    <button onClick={breakItDown} className="bg-transparent hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border w-fit border-violet-900 hover:border-transparent rounded  mx-5 mr-10">Break it down</button>
                    {
                        steps.map((step, index) => {
                            return (
                                // <div className="step w-full" key={index}>
                                    <form key={index} className="create-project-form"> 
                                        <div className="name-date flex gap-5 items-center ">
                                            <button onClick={() => deleteStep(step.id)} className="delte-step-btn flex items-start">
                                                <HighlightOffRoundedIcon color="secondary" className="self-start"></HighlightOffRoundedIcon>
                                            </button>
                                            <textarea required type="text" className="step-name w-[400px] border break-words outline-none rounded-lg p-2" onChange={handleInputChange} value={step.project} name={step.id} placeholder={`Step ${index+1}`}/>
                                            <DatePicker showTimeSelect onChange={(e) => handleDateChange(e, step.id)} className="step-date outline-none border p-4 h-12 rounded-lg" closeOnScroll={true} dateFormat="Pp" selected={new Date(step.date)} />
                                        </div>
                                    </form>
                                // </div>
                            )
                        })
                    }
                    <div className="btns mt-3">
                        <button className="bg-transparent left-[62px] relative hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border border-violet-900 hover:border-transparent rounded  mx-5 mr-10" onClick={createStep}>Add step</button>
                        <button className="submit-btn relative left-52 bg-transparent hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border border-violet-900 hover:border-transparent rounded  mx-5 mr-10" onClick={saveProject} name="save-project">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


