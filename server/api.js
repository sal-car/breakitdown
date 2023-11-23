const API_KEY = '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';
import OpenAI from 'openai';

async function getDataFromOpenAI(request) {
	// console.log('getDataFromOpenAI api.js. request', request);
	const response = await requestDataFromOpenAI(
		request.project,
		request.description
	);
	if (!response) return null;

	// console.log('getDataFromOpenAI api.js. response', response);
	const data = formatResponse(response.choices[0].text);

	// console.log('data: ', data)
	return data;
}

// requests data from OpenAI API
async function requestDataFromOpenAI(name, description = null) {
	const openai = new OpenAI({
		apiKey: API_KEY,
	});

	try {
		const response = await openai.completions.create({
			model: 'gpt-3.5-turbo-instruct',
			prompt: `Divide the following project into small, manageable tasks. Begin each task with \"-\". Min 3 tasks, max 8 tasks.\nProject: ${name}\nDescription: ${description} `,
			temperature: 1,
			max_tokens: 500,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0.4,
		});
		// console.log('response: ', response)

		return response;
	} catch (err) {
		console.log(
			'requestDataFromOpenAI api.js. Error with API request to OpenAI: ',
			err
		);

		return null;
	}
}

// cleans and formats response
function formatResponse(response) {
	// console.log('dirty: ', response)
	const cleanedUpList = response
		.split('\n')
		.map((str) => str.replaceAll(/^([\d\p{P}\p{Z}]+)/gu, '').trim())
		.filter((str) => str != '\n' && str != '');
	// console.log('clean: ', cleanedUpList)
	const formattedList = cleanedUpList.map((str) => {
		return { task: str }; // was parent
	});

	// console.log('formattedlist: ', formattedList);
	return formattedList;
}

export default getDataFromOpenAI;

// -----TESTING-----

// const testObject = {project: "Start a coffee shop", description: "Start a coffee shop that sells organic coffee & cookies"}

// const testResponse = {
//     id: 'cmpl-8IgeD4uEcIBQwTIR2MgKw12UWc4kb',
//     object: 'text_completion',
//     created: 1699464533,
//     model: 'gpt-3.5-turbo-instruct',
//     choices: [
//       {
//         text: '\n' +
//           '\n' +
//           '-Gather cleaning supplies\n' +
//           '-Sort through clothes on the floor\n' +
//           '-Fold and put away clean clothes\n' +
//           '-Separate dirty clothes and put them in the laundry basket\n' +
//           '-Clear off desk and nightstand\n' +
//           '-Dust all surfaces\n' +
//           '-Vacuum or sweep the floor\n' +
//           '-Organize items on desk and nightstand',
//         index: 0,
//         logprobs: null,
//         finish_reason: 'stop'
//       }
//     ],
//     usage: { prompt_tokens: 43, completion_tokens: 87, total_tokens: 130 }
//   }

// const testResponse2 = {
//     id: 'cmpl-8IuspPMFSjsyO0rwl0rCXGCmi8RRF',
//     object: 'text_completion',
//     created: 1699519255,
//     model: 'gpt-3.5-turbo-instruct',
//     choices: [
//       {
//         text: '\n' +
//           '- Research current inflation rates and trends\n' +
//           '- Schedule a meeting with team to discuss inflation\n' +
//           '- Prepare presentation on potential actions to address inflation',
//         index: 0,
//         logprobs: null,
//         finish_reason: 'stop'
//       }
//     ],
//     usage: { prompt_tokens: 45, completion_tokens: 28, total_tokens: 73 }
//   }

// const testDirtyData =   '1. - Create a budget for the birthday party, 100 maybe? \n' +
// '- Determine a date and time for the party \n' +
// '3. - Choose a location for the party \n' +
// '4. - Create a guest list \n' +
// '5. - Send out invitations \n' +
// '6. - Plan the menu and purchase necessary ingredients \n' +
// '7. - Decorate the location for the party \n' +
// '8. - Purchase a gift for my wife'

// getBreakdown(testObject)

// formatResponse(testResponse2.choices[0].text)
