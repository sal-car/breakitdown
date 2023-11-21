import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
	task: String,
	id: String,
	date: Date,
	parent: String,
	completed: Boolean,
});

export const projectSchema = new mongoose.Schema({
	project: String,
	date: Date,
	description: String,
	id: String,
	tasks: [taskSchema],
});
