const BASE_URL = 'http://localhost:3000'


// gets subprojects of provided project from server side API
// parameter: Object {project: "Wash my dogs", description: "Lulu needs a bath"}
// returns: Array [{project: "Get Lulu from doggy daycare"}, ...]
export const getBreakdown = async function (project) {
    // TODO check to see that project has correct format
    try {
        const response = await fetch(BASE_URL + '/breakdown', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(project)
        })
        const result = await response.json()
        return result;
    } catch (error) {
        console.log('Error when fetching api data from server: ', error)
    }
}

// Requests to save the project in the server
// parameter: project {project: "Wash my dogs", description: "Lulu needs a bath", id: "uuidv4", date: Date object}
// returns server response
export const sendToServer = async function (project) {
    try {
        const response = await fetch(BASE_URL + '/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        const result = await response.json()
        return result;
    } catch (error) {
        console.log('Error when sending project to server: ', error)
    }
}

// Fetches projects from server
// returns: result {project: "Wash my dogs", description: "Lulu needs a bath", id: "uuidv4", date: Date object}
export const getProjectsFromServer = async function () {
    try {
        const response = await fetch(BASE_URL + '/projects', {
            method: 'GET',
        });
        const result = await response.json()
        return result;
    } catch (error) {
        console.log('Error when sending project to server: ', error)
    }
}

// Requests a deletion of a project from server
// parameter: project {project: "Wash my dogs", description: "Lulu needs a bath", id: "uuidv4", date: Date object}
// returns server response
export const deleteProject = async function (project) {
    try {
        const response = await fetch(BASE_URL + '/projects', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        const result = await response.JSON()
        return result;
    } catch (error) {
        console.log('Error in apiservice when deleting project: ', error)
    }
}

// Requests that the project's completed property be updated
// parameter: project {project: "Wash my dogs", description: "Lulu needs a bath", id: "uuidv4", date: Date object}
// returns server response
export const toggleCompleted = async function (project) {
    try {
        const response = await fetch(BASE_URL + '/projects', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        return response;
    } catch (error) {
        console.log('Error in apiservice when updating project: ', error)
    }
}