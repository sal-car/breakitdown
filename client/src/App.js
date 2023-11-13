import './App.css';
import React  from 'react';
import {CreateProject} from './components/create-project/create-project.js';
import {ProjectDashboard} from './components/dashboard/project-dashboard.js'
import { useState } from 'react';
import {Navigation} from './components/navigation/navigation.js'
import { Navbar } from './components/navigation/navbar.js';
import { getProjectsFromServer } from './api-service.js';
import { useEffect } from 'react';
import { TaskDashboard } from './components/dashboard/task-dashboard.js';


function App() {
  const [projects, setProjects] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openNavbar, setOpenNavbar] = useState(false)
  const [openProjectDashboard, setOpenProjectDashboard] = useState(true)
  const [openTaskDashboard, setOpenTaskDashboard] = useState(false)

  const handleNavbarClick = function () {
    setOpenNavbar(!openNavbar)
  }

  const toggleCreateModal = function () {
    setOpenCreateModal(!openCreateModal)
  }
  
  useEffect(() => {
    const fetchOldProjects = async function () {
      try {
        const response = await getProjectsFromServer()
        console.log(response)

        setProjects([...response])
      } catch (error) {
        console.log("Error when rendering projects: ", error)
      }
    }
    fetchOldProjects()
    }, [])


  return (
    <div className="App p-0 m-0 min-h-[100vh] ">
        <Navigation className="h-100"
        handleNavbarClick={handleNavbarClick} 
        toggleCreateModal={toggleCreateModal}
        >
        </Navigation>
      {openNavbar ?
        <Navbar 
        setOpenNavbar={setOpenNavbar}
        openProjectDashboard={openProjectDashboard} 
        setOpenProjectDashboard={setOpenProjectDashboard}
        openTaskDashboard={openTaskDashboard} 
        setOpenTaskDashboard={setOpenTaskDashboard}
        openNavbar={openNavbar}
        style={{ height: `${openNavbar ? '300px' : '0px'}`, transition: 'height 1s ease-out'}}
        >
        </Navbar>
        :
        <div></div>
      }
      {
        openProjectDashboard ?
        <ProjectDashboard projects={projects} setProjects={setProjects}/>
        :
        null
      }
     {
        openTaskDashboard ?
        <TaskDashboard setProjects={setProjects} projects={projects}></TaskDashboard>
        :
        null
      }
      {
        openCreateModal ? 
          <CreateProject projects={projects} setProjects={setProjects} toggleCreateModal={toggleCreateModal} className="CreateProject"></CreateProject>
          :
          null
      } 
    </div>
  );
}

export default App;
