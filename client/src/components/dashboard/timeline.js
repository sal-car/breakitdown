import React  from 'react';
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
import { filterProjectsByDate } from '../../utils/filtering';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';



export const TimelineBox = function (props) {
    const [timelineList, setTimelineList] = useState([])
    const [showHourlySchedule, setShowHourlySchedule] = useState()

    const formatDate = function (date) {
        return showHourlySchedule ? 
        moment(new Date(date.date)).format("HH:mm")
        :
        moment(new Date(date.date)).format("DD MMM");
    }

    const setContent = function () {
        if (projectIsATask()) {
            const content = sortByDate(filterProjectsByDate('today', props.projects))
            setShowHourlySchedule(true)
            setTimelineList([...content])
        } else {
            const content = sortByDate(props.projects)
            setShowHourlySchedule(false)
            setTimelineList([...content])
        }
    }

    const sortByDate = function (projects) {
        return [...projects.sort((a,b) => new Date(a.date) - new Date(b.date))]
    }

    const projectIsATask = function () {
        if (props.projects[0] != undefined) {
            return 'parent' in props.projects[0] ? true : false;
        }
    }
    
    useEffect(() => {
        setContent()
    }, [props.projects])


  return (
    <div className=" bg-white/50 rounded-3xl shadow-lg py-5 px-2  ml-5 w-350 ">
        <h1 className='text-2xl text-gray-800 font-semibold light:text-white mb-5 ml-3'>Timeline</h1>
    <div className=" rounded-lg p-5">
        <Timeline position="alternate">
        {
        timelineList ?
        timelineList.map((project, index) => (
            <TimelineItem key={index}>
                <TimelineOppositeContent color="text.secondary" sx={{textAlign: 'right'}} > 
                <p  className="mt-3">{formatDate(project)}</p>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot  color={`${project.completed ? 'success' : 'grey'}`} >
                    {project.completed ? 
                    <StarBorderTwoToneIcon/>
                    : 
                    <AssignmentLateTwoToneIcon/>

                    }
                    </TimelineDot>
                    <TimelineConnector   sx={{height: 70}} />
                </TimelineSeparator>
                <TimelineContent sx={{textAlign: 'left'}}>
                    <p className=" text-gray-700 text-sm shadow-md  bg-[white]/70 font-semibold text-left tracking-wider p-2 rounded-lg w-full">
                    {project.project}
                    </p>
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
