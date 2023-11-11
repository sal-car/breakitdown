const BASE_URL = 'http://localhost:3000'


// gets subprojects of provided project from server side API
// parameter: Object {project: "Wash my dogs", description: "Lulu needs a bath"}
// returns: Array [{project: "Get Lulu from doggy daycare"}, ...]
export const getBreakdown = async function (project) {
    // TODO check to see that project has correct format
    console.log("apiservice obj: ", project)
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

export default getBreakdown;
// const testProject = {project: "Wash my dogs", description: "Lulu needs a bath"}
// getBreakdown(testProject)