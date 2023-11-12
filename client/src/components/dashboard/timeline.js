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
    <div className=" bg-white/30 rounded-xl h-full p-5 ml-5 w-350 ">
        <h1 className='text-xl font-semibold light:text-white mb-5'>Timeline</h1>
        <Timeline position="alternate">
        {
        sortedList ?
        sortedList.map((project, index) => (
            <TimelineItem key={index}>
                <TimelineOppositeContent color="text.secondary"> 
                <p>{formatDate(project)}</p>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><p className="font-semibold text-center">
                    {project.project}</p>
                </TimelineContent>
            </TimelineItem>
        ))
        : null
    }
        </Timeline>
    </div>
  );
}
