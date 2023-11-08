import API_KEY from '../secrets/apikey.js';
import OpenAI from 'openai'


const openai = new OpenAI({
    organization: "org-qIJzIOGwMV7rCOwUcnZhD3ym",
    apiKey: API_KEY,
});


const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Hello!"}],
  });
  console.log(chatCompletion.choices[0].message);

// import OpenAI from 'openai';

// const configuration = new OpenAI.configuration({
//     apiKey: API_KEY,
// });

// async function main() {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: "You are a helpful assistant." }],
//       model: "gpt-3.5-turbo",
//     });
  
//     console.log(completion.choices[0]);
//   }
  

// console.log(main())