import React  from 'react';

export const FilterBy = function ({setFilter}) {


    return (
        <form action="">
        <select className='p-2 bg-white/80 font-semibold text-gray-900 rounded-lg outline-none  w-full' onChange={(e) => setFilter(e.target.value)} name="filter">
          <option  value="all">All</option>
          <option  value="today">Today</option>
          <option value="this-week">This week</option>
          <option value="this-month">This month</option>
        </select>
      </form>
    )
}