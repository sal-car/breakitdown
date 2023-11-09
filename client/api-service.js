const BASE_URL = 'http://localhost:3000'


// gets subprojects of provided project from server side API
// parameter: Object {project: "Wash my dogs", description: "Lulu needs a bath"}
// returns: Array [{project: "Get Lulu from doggy daycare"}, ...]
async function getBreakdown (project) {
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
        console.log(result)
    } catch (error) {
        console.log('Error when fetching api data from server: ', error)
    }
}

const testProject = {project: "Wash my dogs", description: "Lulu needs a bath"}
getBreakdown(testProject)