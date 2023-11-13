import getDataFromOpenAI from '../api.js'
import {db} from '../models/index.js'

export async function getDataFromAPI (req, res) {
    // TODO check if req.body has correct format
    console.log(req.body)
  try {
    const data = await getDataFromOpenAI(req.body);
    res.status(200)
    res.send(data);
} catch (err) {
    console.log('Error with getting data from API: ', err);
    res.sendStatus(500);
}
}

export async function postProject (req, res) {
  try {
    const newProject = req.body;
    console.log(newProject)
    const response = await db.create(newProject);
    console.log(response)
    res.status(201);
    res.send(response);
} catch (err) {
    console.log('err', err);
    res.sendStatus(500);
}
}

export async function getProjects (req, res) {
    try {
        const response = await db.find({});
        res.status(201);
        res.send(response);
    } catch (err) {
        console.log('err', err);
        res.status(500);
    }
}

export async function deleteProject (req, res) {
    try {
        const response = await 
        console.log('deleted: ', response);
        res.status(201);
        res.send(response);
    } catch (error) {
        console.log('Error when deleting project from db: ', error)
    }
}

export async function setAsCompleted (req, res) {
    const id = req.body.id
    const newVal = req.body.completed
    console.log(req.body)
    try {
        const response = await db.updateOne({
            "tasks.id": id
        }, 
        {
            "$set": {
                "tasks.$[xxx].completed": newVal
            }
        },
        {
            arrayFilters: [ { "xxx.id": id } ]
        },
        )
        console.log('updated: ', response);
        res.status(201);
        res.send(response);
    } catch (error) {
        console.log('Error when deleting project from db: ', error)
    }
}

