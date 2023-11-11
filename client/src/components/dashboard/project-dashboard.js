import { useState } from 'react'
import {Project} from '../project&task/project'
import { useEffect } from 'react'

export const ProjectDashboard = function ({projects, setProjects}) {
  const [projectModal, toggleProjectModal] = useState(false)
  const allProjects = [...projects];
  const [showingProjects, setShowingProjects] = useState(projects)
  
  useEffect(() => {
    setShowingProjects(projects)
  }, [projects])


  const handleProjectCardClick = function (id) {
    toggleProjectModal(!projectModal)
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
        console.log('all: ', allProjects)
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
      <div className="Dashboard">
        <div className="info"> 
          <div className="dashboard-header">
            <h1>Projects</h1>
          </div>
          <div className="right-info">
              <form action="">
                <select onChange={filterProjects} name="filter">
                  <option  value="all">All</option>
                  <option  value="today">Today</option>
                  <option value="this-week">This week</option>
                  <option value="this-month">This month</option>
                </select>
              </form>
          </div>
        </div>
          <div className="main-dashboard">
            { showingProjects && showingProjects.length ? 
              showingProjects.map((project, index) => {
                return (
                    <Project key={index} handleProjectCardClick={() => handleProjectCardClick(project)} project={project}></Project>
                )
              })
              :
              <div></div>
            }
          </div>
      </div>
    );
  }
  
