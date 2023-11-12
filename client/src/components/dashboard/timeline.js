import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export const TimelineBox = function (props) {

    const sortByDate = function () {

    }

  return (
    <div className=" bg-white/30 rounded-xl h-full p-5 ml-5 w-70">
        <h1 className='text-xl font-semibold light:text-white mb-5'>Timeline</h1>
        <Timeline position="alternate">
        {
        props.projects ?
        props.projects.map((project, index) => (
            <TimelineItem key={index}>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><p className="font-semibold text-left">{project.project}</p></TimelineContent>
            </TimelineItem>
        ))
        : null // You might want to handle the case where props.projects is falsy (e.g., an empty array)
    }
        {/* </TimelineItem>
        <TimelineItem>
            <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary" />
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineSeparator>
            <TimelineDot variant="outlined" color="secondary" />
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Sleep</TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineSeparator>
            <TimelineDot variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>Repeat</TimelineContent>
        </TimelineItem>
    */}

        </Timeline>
    </div>
  );
}
