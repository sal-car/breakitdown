import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'
import getBreakdown, { sendToServer } from '../../api-service.js'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'


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
                return {project: entry.project, id: uuid, date: new Date()}
            })
            setSteps([...steps, ...newState])
        } catch (error) {
            console.log(error)
        }
    }
    
    // Saving project
    const saveProject = async function (e) {
        e.preventDefault()
        setProjects([...projects, {project: projectData.project, date: projectData, id: projectData.id, tasks: [...steps]}])
        const result = await sendToServer({...projectData, tasks: [...steps]})
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
    <div className='CreateProject'>	
        <div className="header">
            <h1 className="create-project-header">Create project</h1>
            <button onClick={toggleCreateModal} className="close-modal">X</button>
        </div>
        <form onSubmit={saveProject} className="create-project-form">
            <div className="input-area">
                <div className="left name-description">
                    <input required type="text" className="project-name" onChange={handleInputChange} name="project-name" value={projectData.project} placeholder="What's the goal?"/>
                    <textarea placeholder="Would you like to expand on that?" className="project-description" onChange={handleInputChange} name="project-description" value={projectData.description}/>
                </div>
                <div className="right">
                    <DatePicker className="project-date"closeOnScroll={true} showIcon showTimeSelect dateFormat="Pp"  selected={new Date(projectData.date)} onChange={(date) => setprojectData({...projectData, date: new Date(date)})} />
                </div>
            </div> 
            <input  type="submit" className="submit-btn" onChange={handleInputChange} name="save-project"/>
        </form>
        <div className="add-step-btns">
            <button onClick={breakItDown}>Break it down</button>
        </div>
        <div className="steps-container">
            {
                steps.map((step, index) => {
                    return (
                        <div className="step" key={index}>
                            <form className="create-project-form"> 
                                <div className="name-date">
                                    <input required type="text" className="step-name" onChange={handleInputChange} value={step.project} name={step.id} placeholder={index+1}/>
                                    <DatePicker showTimeSelect onChange={(e) => handleDateChange(e, step.id)} className="step-date" closeOnScroll={true} showIcon dateFormat="Pp" selected={new Date(step.date)} />
                                </div>
                                <div className="delete-step">
                                <button onClick={() => deleteStep(step.id)} class="delte-step-btn">X</button>
                                </div>
                            </form>
                        </div>
                    )
                })
            }
            <button onClick={createStep}>Add step</button>
        </div>
    </div>
    )
}


