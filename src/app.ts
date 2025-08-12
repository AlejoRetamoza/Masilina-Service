import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app: Application = express();

import userRoutes from './routes/user.route';
import filesRoutes from './routes/files.route';
import projectRoutes from './routes/project.route';
import emailRoutes from './routes/email.route';
// settings

const port = process.env.PORT;

app.set('port', port || 3000);

// middlewares

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method,');
    res.header('content-type: application/json; charset=utf-8')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next()
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.use('/api/user', userRoutes);
app.use('/api/file', filesRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/email', emailRoutes);

export default app;