import dotenv from 'dotenv';
import { AppDataSource } from "./database";
dotenv.config();

import app from './app';
import './database';

async function main() {
    const port = app.get('port');

    try {
        await AppDataSource.initialize();
        app.listen(port, '0.0.0.0');
        console.log(`App running on port ${port}`);
    } catch (err) {
        console.log(err);
    }
    
}

main();


