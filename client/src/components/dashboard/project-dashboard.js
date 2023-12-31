import React  from 'react';
import { useState } from 'react'
import {Project} from '../project&task/project'
import { useEffect } from 'react'
import { ProjectInfo } from '../project&task/project-info'
import { deleteProject } from '../../api-service'
import { TimelineBox } from './timeline'
import { FilterBy } from './filter-by-date'
import {filterProjectsBy} from '../../utils/filtering'



export const ProjectDashboard = function ({projects, setProjects}) {
  const [projectModal, toggleProjectModal] = useState(false)
  const [clickedProject, setClickedProject] = useState({})
  const [showingProjects, setShowingProjects] = useState(projects)
  const [showOption, setShowOption] = useState(false)
  // STETE WITH FITLERS 'ALL', 'TODAY'
  const [filter, setFilter] = useState('all')
  
  useEffect(() => {
    // SET SHOWING PROJECTS TO FILTER THE PROJECTS STATE BASED ON FILTER STATE
    const filtered = filterProjectsBy(filter, projects)
    setShowingProjects([...filtered])
  }, [filter, projects])


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

      <div className="Dashboard   rounded-3xl  p-5 col-span-8 ml-5 h-fit pb-12">
        <div className="info"> 
          <div className="dashboard-header flex justify-end gap-10 mb-2">
              {/* <h1 className="text-2xl font-semibold text-gray-900">Projects</h1> */}
              <FilterBy setFilter={setFilter} ></FilterBy >
          </div>
        <button onClick={ () => setShowOption(!showOption)}  className='mb-4 text-lg font-semibold text-black'>
        {projects.length > 3 ? showOption ? 
        'Show less'
        :
        'Show more'
        : 
        null
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
        {/* FIXME: height transition not working properly, look for alternatives */}
        <div className={`main-dashboard grid xl:grid-cols-3 grid-rows-10 overflow-hidden lg:grid-cols-3 md:grid-cols-2 sm-grid-cols-1 gap-5	`} style={{ height: `${showOption ? '600px' : '290px'}`, transition: 'height 0.5s ease-out'}} >
            { showingProjects && showingProjects.length ? 
              showingProjects.map((project, index) => {
                return (
                    <Project handleDeleteClick={() => handleDeleteClick(project.id)} onProjectClick={() => handleProjectClick(project)} key={index} project={project} projects={projects} setProjects={setProjects}></Project>
                )
              })
              :
              <div className=" mt-10 ml-2 col-start-2 col-span-2 flex justify-center">
                <p className="font-semibold text-lg">No projects ☹️</p>
              </div>
            }
        </div>
      </div >
      <div className="col-span-4 mr-5">
        <TimelineBox  projects={projects}></TimelineBox>
      </div>
    </div>
    );
  }
  
