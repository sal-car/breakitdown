import { create } from 'domain';
import API_KEY from '../secrets/apikey.js';
import OpenAI from 'openai'


// Fetches data from OpenAI API
// parameter: Object {project: "Clean my room", description: "My room is a mess"}
// returns: Array [{project: "Gather cleaning supplies"}, ...] OR null if error in API request
async function getBreakdown (project) {
        const response = await requestDataFromAPI(project.name, project.description);
        if (!response) return null;

        const data = formatResponse(response.choices[0].text);

        console.log('data: ', data)
        return data;
};

// requests data from OpenAI API
async function requestDataFromAPI (name, description) {
    const openai = new OpenAI({
        apiKey: API_KEY,
    });

    try {
        const response = await openai.completions.create({
            model:"gpt-3.5-turbo-instruct",
            prompt:`Divide the following project into small, manageable tasks. Begin each task with \"-\". Min 3 tasks, max 8 tasks.\nProject: ${name}\nDescription: ${description} `,
            temperature:1,
            max_tokens:140,
            top_p:1,
            frequency_penalty:0,
            presence_penalty:0.4
        });
        console.log('res: ', response)
        return response;
    } catch (err) {
        console.log('Error with API request to OpenAI: ', err);

        return null;
    };
};

// cleans and formats response
function formatResponse (response) {
    console.log('dirty: ', response)
    const cleanedUpList = response.split('\n').map((str) => str.replaceAll(/^([\d\p{P}\p{Z}]+)/gu, '').trim())
    // .map((str) => str.trim()).filter((str) => str != '\n' || str != '')
    console.log('clean: ', cleanedUpList)
    const formattedList = cleanedUpList.map((str) => {return {project: str}});
    
    return formattedList;
};


// const testResponse = {
//     id: 'cmpl-8IgeD4uEcIBQwTIR2MgKw12UWc4kb',
//     object: 'text_completion',
//     created: 1699464533,
//     model: 'gpt-3.5-turbo-instruct',
//     choices: [
//       {
//         text: '\n' +
//           '\n' +
//           'Step 1: Gather cleaning supplies\n' +
//           'Step 2: Sort through clothes on the floor\n' +
//           'Step 3: Fold and put away clean clothes\n' +
//           'Step 4: Separate dirty clothes and put them in the laundry basket\n' +
//           'Step 5: Clear off desk and nightstand\n' +
//           'Step 6: Dust all surfaces\n' +
//           'Step 7: Vacuum or sweep the floor\n' +
//           'Step 8: Organize items on desk and nightstand',
//         index: 0,
//         logprobs: null,
//         finish_reason: 'stop'
//       }
//     ],
//     usage: { prompt_tokens: 43, completion_tokens: 87, total_tokens: 130 }
//   }


export default getBreakdown;

const testObject = {project: "Organise a party", description: "A birthday party for my wife"}

const testResponse = {
    id: 'cmpl-8IgeD4uEcIBQwTIR2MgKw12UWc4kb',
    object: 'text_completion',
    created: 1699464533,
    model: 'gpt-3.5-turbo-instruct',
    choices: [
      {
        text: '\n' +
          '\n' +
          '-Gather cleaning supplies\n' +
          '-Sort through clothes on the floor\n' +
          '-Fold and put away clean clothes\n' +
          '-Separate dirty clothes and put them in the laundry basket\n' +
          '-Clear off desk and nightstand\n' +
          '-Dust all surfaces\n' +
          '-Vacuum or sweep the floor\n' +
          '-Organize items on desk and nightstand',
        index: 0,
        logprobs: null,
        finish_reason: 'stop'
      }
    ],
    usage: { prompt_tokens: 43, completion_tokens: 87, total_tokens: 130 }
  }

const testDirtyData =   '1. - Create a budget for the birthday party, 100 maybe? \n' +
'- Determine a date and time for the party \n' +
'3. - Choose a location for the party \n' +
'4. - Create a guest list \n' +
'5. - Send out invitations \n' +
'6. - Plan the menu and purchase necessary ingredients \n' +
'7. - Decorate the location for the party \n' +
'8. - Purchase a gift for my wife'

  formatResponse(testDirtyData)
