import { AppDataSource } from "./data-source";
import express from "express"; // Import Express as a default import
import cors from 'cors';

import { AuthRoutes } from './routes/authRoutes';

AppDataSource.initialize().then(async () => {

    const app: express.Application = express(); // Define app as type express.Application
    app.use(express.json());
    app.use(cors());

    app.use('/auth', AuthRoutes.router);

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

}).catch(error => console.log(error))
