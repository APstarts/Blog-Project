import express from 'express';
import cors from 'cors';
import { PORT } from './configs/env.config.js';
import db from './database/db.js';
import authRoute from './routes/authRoutes.js';

db.connect(error => {
    if(error){
        console.log(error);
    }
    console.log("Database connected successfully.");
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api/", authRoute);

app.listen(PORT, (req, res) => {
    console.log(`server is runnning at http://localhost:${PORT}`);
});