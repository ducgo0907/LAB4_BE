import express from 'express';
import * as dotenv from "dotenv";
import ConnectDB from './database/database.js';
import router from './routes/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import cors from 'cors'

const app = express();
app.use(fileUpload({
	limits: {
		fileSize: 10000000,
	},
	abortOnLimit: true,
}));
app.use(express.json());

app.use(cors({
	origin: ['http://localhost:3000'], // Replace with the origin of your frontend
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, // Enable credentials (if needed)
}))

dotenv.config()

app.get('/', (req, res) => {
	res.send("Hello Lab 4");
})

app.use(router);

const port = process.env.PORT || 8080;
app.listen(port, async () => {
	await ConnectDB();
	console.log(`Node API app running on port ${port}`);
})

export const __dirname = dirname(fileURLToPath(import.meta.url));