import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config.json';
import path from 'path';
import gameRouter from './routes/gameRoute';
import detailsRouter from './routes/detailsRoute';
import { errors } from 'celebrate';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { lobbySocket } from './routes/sockets/lobbySocket';
import { gameSocket } from './routes/sockets/gameSocket';
import gameMiddleware from './middleware/gameMiddleware';
///////////////////////////////////////////////////////////////////////////
////////////////////////////// EXPRESS CONFIG /////////////////////////////
///////////////////////////////////////////////////////////////////////////

const app = express();


app.use(bodyParser.json());
app.use('/game', gameRouter);
app.use('/details', detailsRouter);

app.use(express.static(path.join(__dirname, '/build')));
app.use(errors());
///////////////////////////////////////////////////////////////////////////
///////////////////////////// SOCKET IO CONFIG ////////////////////////////
///////////////////////////////////////////////////////////////////////////

const httpServer = createServer(app);
const io = new Server(httpServer);
io.use(gameMiddleware);

const lobbyIO = io.of('/lobby');
const gameIO = io.of('/game');
lobbyIO.on('connection', lobbySocket);
gameIO.on('connection', gameSocket);





httpServer.listen(config.port, () => {
   console.log('what-to-watch listening on port ' + config.port);
});