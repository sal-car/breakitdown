import React  from 'react';
import {filterProjectsByDate} from '../../utils/filtering'

export const FilterByDate = function ({setShowingProjects, projects}) {

    const filter = function (e) {
      const filtered = filterProjectsByDate(e.target.value, projects)
      setShowingProjects(filtered)
    }


    return (
        <form action="">
        <select className='p-2 bg-white/80 font-semibold text-gray-900 rounded-lg outline-none  w-full' onChange={filter} name="filter">
          <option  value="all">All</option>
          <option  value="today">Today</option>
          <option value="this-week">This week</option>
          <option value="this-month">This month</option>
        </select>
      </form>
    )
}