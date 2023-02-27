import { Express } from 'express';
import * as express from 'express';
import * as dotenv from "dotenv";

dotenv.config();


import apiRouter from './routes/api';

const app: Express = express();
const port: number = +(process.env.PORT as string);


app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
