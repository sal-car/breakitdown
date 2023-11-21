import express from 'express';
import cors from 'cors';
import router from './router.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3005;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(router);
console.log('working');

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
