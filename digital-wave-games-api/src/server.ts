import express, { Application } from 'express';
import logger from './utils/logger';
import * as bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import connectMongo from './databases/mongodb.database';


const app: Application = express();
connectMongo();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
  {
    origin: '*',
  }
));

app.use('/', routes);

var port = process.env.PORT || 3006;

app
  .listen(port, () => {
    logger.info(`server running on port : ${port}`);
  })
  .on('error', (e) => logger.error(e));