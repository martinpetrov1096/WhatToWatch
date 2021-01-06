import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import gameRouter from './routes/gameRoute';

import { errors } from 'celebrate';
import * as socketio from 'socket.io';

import gameMiddleware from './middleware/gameMiddleware';
///////////////////////////////////////////////////////////////////////////
////////////////////////////// EXPRESS CONFIG /////////////////////////////
///////////////////////////////////////////////////////////////////////////

const app = express();
app.use(bodyParser.json());

app.use('/game', gameRouter);
app.use(errors());

const server = require('http').createServer(app);
export const io = require('socket.io')(server);
io.use(gameMiddleware);


app.listen(config.port, () => {
   console.log('what-to-watch listening on port ' + config.port);
});