import React, { useState, useContext } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import getBreakdown, { sendToServer } from '../../services/api-service';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { ProjectsContext } from '../../context/project-context';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
// import { ProjectType, TaskType } from '../types/types';

interface CreateProjectProps {
	toggleCreateModal: () => void;
}

export interface TaskType {
	task: string;
	id: string;
	date: Date;
	parent: string;
	completed: boolean;
}

export interface ProjectType {
	project: string;
	date: Date;
	description: string;
	id: string;
	tasks: TaskType[];
}

export const CreateProject: React.FC<CreateProjectProps> = ({
	toggleCreateModal,
}) => {
	const [projectData, setProjectData] = useState<ProjectType>({
		project: '',
		date: new Date(),
		description: '',
		id: uuidv4(),
		tasks: [],
	});
	const [steps, setSteps] = useState<TaskType[]>([]);
	const { projects, setProjects } = useContext(ProjectsContext);

	const createStep = () => {
		const uuid = uuidv4();
		const stepInterval = calculateStepInterval(
			steps.length + 1,
			projectData.date
		);
		setSteps([
			...steps,
			{
				task: '',
				id: uuid,
				date: stepInterval.nextDate,
				parent: projectData.id,
				completed: false,
			},
		]);
	};

	const calculateStepInterval = (totalSteps: number, endDate: Date) => {
		const startDate = new Date();
		const timeDiff = endDate.getTime() - startDate.getTime();
		const dayDiff = timeDiff / (1000 * 3600 * 24);
		const interval = dayDiff / totalSteps;
		const nextDate = new Date(
			startDate.getTime() + interval * (totalSteps - 1) * (1000 * 3600 * 24)
		);
		return { interval, nextDate };
	};

	const deleteStep = (id: string) => {
		setSteps(steps.filter((step) => step.id !== id));
	};

	const breakItDown = async () => {
		try {
			const data = await getBreakdown(projectData);
			const totalSteps = data.length;
			data.forEach((entry: TaskType, index: number) => {
				const { nextDate } = calculateStepInterval(index + 1, projectData.date);
				const newStep: TaskType = {
					task: entry.task,
					id: uuidv4(),
					date: nextDate,
					parent: projectData.id,
					completed: false,
				};
				setSteps((prevSteps) => [...prevSteps, newStep]);
			});
		} catch (error) {
			console.log('Error in breakItDown:', error);
		}
	};

	// e: React.MouseEvent<HTMLButtonElement>
	// e.preventDefault();
	const saveProject = async () => {
		const newProject: ProjectType = {
			project: projectData.project,
			date: projectData.date,
			description: projectData.description,
			id: projectData.id,
			tasks: [...steps],
		};

		setProjects([...projects, newProject]);
		await sendToServer(newProject);
		toggleCreateModal();
	};

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		if (name === 'project-name') {
			setProjectData((prev: ProjectType) => ({ ...prev, project: value }));
		} else if (name === 'project-description') {
			setProjectData((prev: ProjectType) => ({ ...prev, description: value }));
		} else {
			setSteps(
				steps.map((step) =>
					name === step.id ? { ...step, task: value } : step
				)
			);
		}
	};

	const handleDateChange = (date: Date, id: string) => {
		setSteps(
			steps.map((step) =>
				step.id === id ? { ...step, date: new Date(date) } : step
			)
		);
	};

	return (
		<div className="CreateProject overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-gray-600/50">
			<div className="relative p-4 min-w-fit max-w-fit max-h-full top-24 mx-auto">
				<div className="relative bg-white rounded-xl shadow px-10 py-8 flex flex-col">
					<div className="header flex justify-between mb-12">
						<h1 className="create-project-header text-2xl font-semibold">
							Create project
						</h1>
						<button onClick={toggleCreateModal} className="close-modal">
							<HighlightOffRoundedIcon
								color="inherit"
								fontSize="large"
								className="absolute  top-[-5px] right-[-5px]"
							></HighlightOffRoundedIcon>
						</button>
					</div>
					<form className="create-project-form">
						<div className="input-area">
							<div className="name-date flex gap-5 mr-3">
								<div className="name flex flex-col gap-1 mb-8">
									<label
										htmlFor="project-name"
										className="font-semibold tracking-wide"
									>
										Project
									</label>
									<input
										required
										type="text"
										className="project-name outline-none border p-2.5 rounded-lg w-[400px]"
										onChange={handleInputChange}
										name="project-name"
										value={projectData.project}
										placeholder="What's the goal?"
									/>
								</div>
								<div className="date-picker flex flex-col mb-12">
									<label
										htmlFor="date"
										className="font-semibold tracking-wide mb-1"
									>
										Deadline
									</label>
									<DatePicker
										className="project-date outline-none border p-4 h-12 rounded-lg"
										closeOnScroll={true}
										showTimeSelect
										dateFormat="Pp"
										selected={new Date(projectData.date)}
										onChange={(date: Date | null) =>
											setProjectData({
												...projectData,
												date: date ? new Date(date) : new Date(),
											})
										}
									/>
								</div>
							</div>
							<div className="description flex flex-col gap-1 mb-10">
								<label
									htmlFor="project-description"
									className=" font-semibold tracking-wide "
								>
									Description
								</label>
								<textarea
									placeholder="Would you like to expand on that?"
									className="project-description h-28 outline-none border p-2.5 rounded-xl"
									onChange={handleInputChange}
									name="project-description"
									value={projectData.description}
								/>
							</div>
						</div>
					</form>
					<div className="steps-container flex flex-col items-center gap-10 w-full ">
						<button
							onClick={breakItDown}
							className="bg-transparent hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border w-fit border-violet-900 hover:border-transparent rounded  mx-5 mr-10"
						>
							Break it down
						</button>
						{steps.map((step, index) => {
							return (
								<form key={index} className="create-project-form">
									<div className="name-date flex gap-5 items-center ">
										<button
											onClick={() => deleteStep(step.id)}
											className="delte-step-btn flex items-start"
										>
											<HighlightOffRoundedIcon
												color="secondary"
												className="self-start"
											></HighlightOffRoundedIcon>
										</button>
										<input
											required
											type="text"
											className="step-name w-[400px] border break-words outline-none rounded-lg p-2"
											onChange={handleInputChange}
											value={step.task}
											name={step.id}
											placeholder={`Step ${index + 1}`}
										/>
										<DatePicker
											showTimeSelect
											onChange={(date: Date) => handleDateChange(date, step.id)}
											className="step-date outline-none border p-4 h-12 rounded-lg"
											closeOnScroll={true}
											dateFormat="Pp"
											selected={new Date(step.date)}
										/>
									</div>
								</form>
							);
						})}
						<div className="btns mt-3">
							<button
								className="bg-transparent left-[62px] relative hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border border-violet-900 hover:border-transparent rounded  mx-5 mr-10"
								onClick={createStep}
							>
								Add step
							</button>
							<button
								className="submit-btn relative left-52 bg-transparent hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border border-violet-900 hover:border-transparent rounded  mx-5 mr-10"
								onClick={saveProject}
								name="save-project"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
