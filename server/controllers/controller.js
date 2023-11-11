import getDataFromOpenAI from '../api.js'
import {db} from '../models/index.js'

export async function getDataFromAPI (req, res) {
    // TODO check if req.body has correct format
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
    console.log(res)
    console.log('get reached')
    try {
        const response = await db.find({});
        console.log(response)
        res.status(201);
        res.send(response);
    } catch (err) {
        console.log('err', err);
        res.status(500);
    }
}


