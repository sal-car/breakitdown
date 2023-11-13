export const filterProjectsByDate = function (option, projects) {
    let today = new Date();

    switch (option) {

      case "all":
        return [...projects];

      case "today": {

        const todaysProjects = projects.filter((project) => {
          return new Date(project.date).getDate() === today.getDate() &&
          new Date(project.date).getMonth() === today.getMonth() &&
          new Date(project.date).getYear() === today.getYear()
        })

        return [...todaysProjects];
      }
      
      case "this-week": {
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
          
          return [...thisWeeksProjects];       
        }
          
          case "this-month": {
            const thisMonthsProjects = projects.filter((project) => {
              return new Date(project.date).getMonth() == today.getMonth() &&
              new Date(project.date).getYear() == today.getYear()
            })
            
            return [...thisMonthsProjects];
          }
    
      default:
        break;
    }
  }