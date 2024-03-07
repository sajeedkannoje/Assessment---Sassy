import { AppDataSource } from "./data-source"
import express from 'express';
import cors from 'cors';

import { AuthRoutes } from './routes/authRoutes';
// import { TaskRoutes } from './routes/taskRoutes';

AppDataSource.initialize().then(async () => {

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use('/auth', AuthRoutes.router);

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });


}).catch(error => console.log(error))
