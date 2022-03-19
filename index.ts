import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './connect/db'

dotenv.config();

connectDB()

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello Netflix clone API!</h1>');
});

app.listen(process.env.PORT, () => console.log(`Running on ${process.env.PORT} ⚡`));