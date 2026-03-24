import express from 'express';
import v1Router from './routes/v1.router'
import cors from "cors"
import {corsOptions} from "./corsOprions";

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors(corsOptions));
app.use(v1Router);




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
