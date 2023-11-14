import './App.css';
import React  from 'react';
import {CreateProject} from './components/create-project/create-project.js';
import {ProjectDashboard} from './components/dashboard/project-dashboard.js'
import { useState } from 'react';
import {Navigation} from './components/navigation/navigation.js'
// import { Navbar } from './components/navigation/navbar.js';
import { getProjectsFromServer } from './api-service.js';
import { useEffect } from 'react';
import { TaskDashboard } from './components/dashboard/task-dashboard.js';
import {HeroSection} from './components/landing-page/hero-section.js'


/* eslint-disable */

function App() {
  const [projects, setProjects] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openProjectDashboard, setOpenProjectDashboard] = useState(true)
  const [openTaskDashboard, setOpenTaskDashboard] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

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
    <div className="App"> {
      !isAuthenticated &&
      <HeroSection></HeroSection>
      
      ||

      <div className="App-0 m-0 min-h-[100vh] ">
          <Navigation className="h-100"
          toggleCreateModal={toggleCreateModal}
          openProjectDashboard={openProjectDashboard} 
          setOpenProjectDashboard={setOpenProjectDashboard}
          openTaskDashboard={openTaskDashboard} 
          setOpenTaskDashboard={setOpenTaskDashboard}
          >
          </Navigation>
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
  }
    </div>
  );
}

export default App;
