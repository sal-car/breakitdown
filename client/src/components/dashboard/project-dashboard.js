import { useState } from 'react'
import {Project} from '../project&task/project'
import { useEffect } from 'react'
import { ProjectInfo } from '../project&task/project-info'
import { deleteProject } from '../../api-service'
import { TimelineBox } from './timeline'
import { FilterByDate } from './filter-by-date'


export const ProjectDashboard = function ({projects, setProjects}) {
  const [projectModal, toggleProjectModal] = useState(false)
  const [clickedProject, setClickedProject] = useState({})
  const [showingProjects, setShowingProjects] = useState(projects)
  const [showOption, setShowOption] = useState(false)
  
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


    
    return (
      <div className="main grid grid-cols-12 w-full h-full">

      <div className="Dashboard bg-white/60 rounded-3xl shadow-lg p-5 col-span-9 ml-5 h-fit">
        <div className="info"> 
          <div className="dashboard-header flex justify-between gap-10 mb-5">
              <h1 className='text-2xl font-semibold text-gray-800'>Projects</h1>
              <FilterByDate setShowingProjects={setShowingProjects} projects={projects} ></FilterByDate>
          </div>
        <button onClick={ () => setShowOption(!showOption)}  className='mb-2 text-m font-semibold text-gray-900'>
        {showOption ? 
        '☝️ Show less'
        : 
        '👉 Show more'
      }
      </button>
        {
          projectModal ?
          <ProjectInfo project={clickedProject} toggleProjectModal={toggleProjectModal}></ProjectInfo>
          :
          null
// ${showOption ? 'h-fit' : 'h-28'} `}
        } 
        </div>
        <div className={`main-dashboard grid xl:grid-cols-4 overflow-hidden lg:grid-cols-3 md:grid-cols-2 sm-grid-cols-1 gap-5	`} style={{ height: 'fit-content', height: `${showOption ? '300px' : '230px'}`, transition: 'height 0.5s ease-out'}} >
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
      <div className="col-span-3 mr-5">
        <TimelineBox  projects={projects}></TimelineBox>
      </div>
    </div>
    );
  }
  
