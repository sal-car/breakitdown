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
