export const FilterByDate = function ({setShowingProjects, projects}) {

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
        <form action="">
        <select className='bg-white/0 font-semibold text-gray-900 rounded-lg outline-none  w-full p-3' onChange={filterProjects} name="filter">
          <option  value="all">All</option>
          <option  value="today">Today</option>
          <option value="this-week">This week</option>
          <option value="this-month">This month</option>
        </select>
      </form>
    )
}