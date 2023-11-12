import { useState } from 'react'
import {Project} from '../project&task/project'
import { useEffect } from 'react'
import { ProjectInfo } from '../project&task/project-info'
import { deleteProject } from '../../api-service'
import { TimelineBox } from './timeline'

export const ProjectDashboard = function ({projects, setProjects}) {
  const [projectModal, toggleProjectModal] = useState(false)
  const [clickedProject, setClickedProject] = useState({})
  const [showingProjects, setShowingProjects] = useState(projects)
  
  useEffect(() => {
    setShowingProjects(projects)
  }, [projects])


  const handleProjectClick = function (project) {
    toggleProjectModal(!projectModal)
    setClickedProject(project)

  }

  const handleDeleteClick = function (id) {
    const deleteThis = projects.find((project) => project.id === id)
    setProjects(projects.filter((project) => project.id != id))
    deleteProject(deleteThis)

  }

  const filterProjects = function (e) {
    let today = new Date();

    switch (e.target.value) {

      case 'all':
        setShowingProjects([...projects])
        break;

      case "today":
        const todaysProjects = projects.filter((project) => {
          return new Date(project.date).getDate() == today.getDate() &&
          new Date(project.date).getMonth() == today.getMonth() &&
          new Date(project.date).getYear() == today.getYear()
        })

        setShowingProjects([...todaysProjects])
        break;

      case "this-week":

      // GETTING THIS WEEK'S DATES        
        let week = [today];
        let counter = 1;
        
        for (let i = today.getDay() + 1; i <= 6; i++) {
          let nextDay = new Date(today);
          nextDay.setDate(today.getDate() + counter);
          week.push(nextDay);
          counter++;
        }

        // FILTERING PROJECTS WITH DATE THIS WEEK
        const thisWeeksProjects = projects.filter((project) => {
          let projectDate = new Date(project.date);

          return week.some((date) => {
            return (
              projectDate.getYear() === date.getYear() &&
              projectDate.getMonth() === date.getMonth() &&
              projectDate.getDate() === date.getDate()
            );
          });
        }
        )

        setShowingProjects([...thisWeeksProjects])        
        break;

      case "this-month":
        const thisMonthsProjects = projects.filter((project) => {
          return new Date(project.date).getMonth() == today.getMonth() &&
          new Date(project.date).getYear() == today.getYear()
        })

        setShowingProjects([...thisMonthsProjects]);
        break;
    
      default:
        break;
    }
  }
    
    return (
      <div className="main grid grid-cols-10 w-full">

      <div className="Dashboard bg-white/30 rounded-xl h-full p-5 col-span-7">
        <div className="info"> 
          <div className="dashboard-header flex justify-between gap-10 mb-5">
              <h1 className='text-2xl font-bold light:text-white'>Projects</h1>
                <form action="">
                  <select className='bg-white/0 font-semibold text-gray-900 text-m rounded-lg outline-none  w-full p-3' onChange={filterProjects} name="filter">
                    <option  value="all">All</option>
                    <option  value="today">Today</option>
                    <option value="this-week">This week</option>
                    <option value="this-month">This month</option>
                  </select>
                </form>
          </div>
        {
          projectModal ?
          <ProjectInfo project={clickedProject} toggleProjectModal={toggleProjectModal}></ProjectInfo>
          :
          null

        } 
        </div>
        <div className="main-dashboard grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm-grid-cols-1 gap-2 ">
            { showingProjects && showingProjects.length ? 
              showingProjects.map((project, index) => {
                return (
                    <Project handleDeleteClick={() => handleDeleteClick(project.id)} onProjectClick={() => handleProjectClick(project)} key={index} project={project}></Project>
                )
              })
              :
              <div className="flex justify-center w-full">
                <p>Woops, no projects here</p>
              </div>
            }
        </div>
      </div >
      <div className="col-span-3">
        <TimelineBox  projects={projects}></TimelineBox>
      </div>
    </div>
    );
  }
  
