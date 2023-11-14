export const filterProjectsBy = function (option, items, itemsToFilterBy=null) {
    if (option === 'all') return [...items];

    // Filter by project
    if (itemsToFilterBy != null) {
        return items.filter((item) => item.parent === option)
    }

    // Filter by date
    let today = new Date();

    switch (option) {

      case "today": {

        const todaysItems = items.filter((project) => {
          return new Date(project.date).getDate() === today.getDate() &&
          new Date(project.date).getMonth() === today.getMonth() &&
          new Date(project.date).getYear() === today.getYear()
        })

        return [...todaysItems];
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

        // FILTERING items WITH DATE THIS WEEK
        const thisWeeksItems = items.filter((project) => {
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
          
          return [...thisWeeksItems];       
        }
          
          case "this-month": {
            const thisMonthsItems = items.filter((project) => {
              return new Date(project.date).getMonth() == today.getMonth() &&
              new Date(project.date).getYear() == today.getYear()
            })
            
            return [...thisMonthsItems];
          }
    
      default:
        return [...items];
    }
  }