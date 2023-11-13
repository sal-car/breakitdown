import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';




export const TimelineBox = function (props) {
    const [sortedList, setSortedList] = useState([])

    const formatDate = function (date) {
        console.log(date)
        return moment(new Date(date.date)).format("DD MMM")
    }

    useEffect(() => {
        setSortedList(sortByDate())
    }, [props.projects])

    const sortByDate = function () {
        return [...props.projects.sort((a,b) => new Date(a.date) - new Date(b.date))]
    }

  return (
    <div className=" bg-white/50 rounded-3xl shadow-lg py-5 px-2  ml-5 w-350 ">
        <h1 className='text-2xl text-gray-800 font-semibold light:text-white mb-5 ml-3'>Timeline</h1>
    <div className=" rounded-lg p-5">
        <Timeline position="alternate">
        {
        sortedList ?
        sortedList.map((project, index) => (
            <TimelineItem key={index}>
                <TimelineOppositeContent color="text.secondary" sx={{textAlign: 'left'}}> 
                <p>{formatDate(project)}</p>
                </TimelineOppositeContent>
                <TimelineSeparator>
                {/* <Typography variant="h6" component="span"> */}
                    <TimelineDot sx={{ width: 15, height: 15}} variant="outlined" />
                {/* </Typography> */}
                    <TimelineConnector   sx={{height: 70}} />
                </TimelineSeparator>
                {/* <div className="border-2 rounded-lg h-10 "> */}
                <TimelineContent sx={{textAlign: 'left'}}><p className=" text-gray-800 shadow-md  bg-[white]/70 font-semibold text-left tracking-wider p-2 px-4 rounded-lg w-full">
                    {project.project}</p>
                </TimelineContent>

                {/* </div> */}
            </TimelineItem>
        ))
        : null
    }
        </Timeline>


    </div>
    </div>
  );
}
