import React, { useContext, useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import moment from 'moment';
import { ProjectsContext } from '../../context/project-context';
// import { ProjectType } from '../types/types.ts';

interface TaskType {
	task: string;
	id: string;
	date: Date;
	parent: string;
	completed: boolean;
}

interface ProjectType {
	project: string;
	date: Date;
	description: string;
	id: string;
	tasks: TaskType[];
}

interface TimelineBoxProps {
	projects: ProjectType[];
}

export const TimelineBox: React.FC<TimelineBoxProps> = ({ projects }) => {
	const [sortedList, setSortedList] = useState<ProjectType[]>([]);

	const formatDate = (date: Date): string => {
		return moment(date).format('DD MMM');
	};

	useEffect(() => {
		const sortedProjects = [...projects].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);
		setSortedList(sortedProjects);
	}, [projects]);

	return (
		<div className="bg-white/50 rounded-3xl shadow-lg py-5 px-2 ml-5 w-350">
			<h1 className="text-2xl text-gray-800 font-semibold light:text-white mb-5 ml-3">
				Timeline
			</h1>
			<div className="rounded-lg p-5">
				<Timeline position="alternate">
					{sortedList.map((project, index) => (
						<TimelineItem key={project.id || index}>
							<TimelineOppositeContent
								color="text.secondary"
								sx={{ textAlign: 'left' }}
							>
								<p>{formatDate(new Date(project.date))}</p>
							</TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineDot
									sx={{ width: 15, height: 15 }}
									variant="outlined"
								/>
								<TimelineConnector sx={{ height: 70 }} />
							</TimelineSeparator>
							<TimelineContent sx={{ textAlign: 'left' }}>
								<p className="text-gray-800 shadow-md bg-[white]/70 font-semibold text-left tracking-wider p-2 px-4 rounded-lg w-full">
									{project.project}
								</p>
							</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			</div>
		</div>
	);
};
