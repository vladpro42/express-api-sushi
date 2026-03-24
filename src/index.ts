import express from 'express';
import v1Router from './routes/v1.router'
import cors from "cors"
import {corsOptions} from "./corsOprions";
import "reflect-metadata"
import {db} from "./db";

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors(corsOptions));
app.use(v1Router);




const startServer = async () => {
    try {
        await db.initialize();
        console.log("✅ Database initialized successfully");

        await db.query('SELECT 1');
        console.log("✅ Database connection verified");

        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
            console.log(`📊 Database status: ${db.isInitialized ? 'Connected' : 'Disconnected'}`);
        });

    } catch (error) {
        console.error("❌ Failed to initialize database:", error);
        process.exit(1);
    }
};

export { db };
startServer();