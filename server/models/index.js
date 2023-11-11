import mongoose from "mongoose";
import {projectSchema} from "./schemas.js";

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Database connected')
}


export const db = mongoose.model('Project', projectSchema)