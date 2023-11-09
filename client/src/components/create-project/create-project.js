import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'


export const CreateProject = function () {
    const [projectData, setprojectData] = useState({
        project: "",
        date: "",
        description: ""
    });


    const [steps, setSteps] = useState([])


   

    // Creating a step
    const createStep = () => {
        setSteps([...steps, {project: '', id: Date.now()}])
        console.log(steps)
    }




    const [startDate, setStartDate] = useState(new Date());

    function handleChange (event) {
        const name = event.target.name;
        const value = event.target.value;

        if (name == 'project-name') {
            setprojectData((prev) => ({...prev, project: event.target.value}))
        } else if (name == 'project-description') {
            setprojectData((prev) => ({...prev, description: event.target.value}))

        } else if (Number(name) != NaN) {
            setSteps(
                steps.map((step, index) => {
                    if (Number(name) == step.id) {
                        return {...step, project: event.target.value}
                    } else {
                        return step;
                    }
                })

            )
        }

                
    }



    return ( 
    <div className='CreateProject'>	
        <form className="create-project-form"> 
            <div className="name-date">
                <input type="text" className="project-name" onChange={handleChange} name="project-name" value={projectData.project} placeholder="What's the goal?"/>
                <DatePicker closeOnScroll={true} showIcon showTimeSelect dateFormat="Pp"  selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <textarea placeholder="Would you like to expand on that?" className="project-description" onChange={handleChange} name="project-description" value={projectData.description}/>
            <input type="submit" className="submit-btn" onChange={handleChange} name="save-project"/>
        </form>
        <div className="add-step-btns">
            <button>Break it down</button>
            <button onClick={createStep}>Add step</button>
        </div>
        <div className="steps-container">
            {
                steps.map((step, index) => {
                    return (
                        <div key={index}>
                            <form className="create-project-form"> 
                                <div className="name-date">
                                    <input type="text" className="project-name" onChange={handleChange} value={step.project} name={step.id} placeholder={index+1}/>
                                    <DatePicker closeOnScroll={true} showIcon showTimeSelect dateFormat="Pp"  selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                                <div className="add-step-btns">
                                <button>Add step</button>
                                </div>
                            </form>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )
}


