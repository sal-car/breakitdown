import { useState } from 'react'
import {Project} from '../project/project'
import { ProjectInfo } from '../project/project-info'

export const ProjectDashboard = function ({projects}) {
  const [projectModal, toggleProjectModal] = useState(false)



  const handleProjectCardClick = function (id) {
    console.log(id)
    console.log(projects)
    toggleProjectModal(!projectModal)
  }
    
    return (
      <div className="Dashboard">
        <div className="info"> 
          <div className="left-info">
            <h1>Projects</h1>
          </div>
          <div className="right-info">
              <form action="">
                <select name="filter">
                  <option value="today">Today</option>
                  <option value="this-week">This week</option>
                  <option value="this-month">This month</option>
                </select>
              </form>
          </div>
        </div>
          <div className="main-dashboard">
            { projects.length ? 
              projects.map((project) => {
                return (
                    <Project handleProjectCardClick={() => handleProjectCardClick(project)} project={project}></Project>
                )
              })
              :
              <div></div>
            }
          </div>
      </div>
    );
  }
  
