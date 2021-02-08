import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config.json';
import path from 'path';
import dotenv from 'dotenv'
import gameRouter from './routes/gameRoute';
import infoRouter from './routes/infoRoute';
import { errors } from 'celebrate';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { lobbySocket } from './routes/sockets/lobbySocket';
import { gameSocket } from './routes/sockets/gameSocket';
import history from 'connect-history-api-fallback';
import gameMiddleware from './middleware/gameMiddleware';
///////////////////////////////////////////////////////////////////////////
////////////////////////////// EXPRESS CONFIG /////////////////////////////
///////////////////////////////////////////////////////////////////////////

/**
 * Check that all env variables exist before starting
 */
dotenv.config();

if (!process.env.API_KEY) {
   console.error('Missing API_KEY env variable');
   process.exit(1);
}
if (!process.env.DB_IP) {
   console.error('Missing DB_IP env variable');
   process.exit(1);
}
if (!process.env.DB_PORT) {
   console.error('Missing DB_PORT env variable');
   process.exit(1);
}

const app = express();
app.use(bodyParser.json());
app.use('/api/game', gameRouter);
app.use('/api/info', infoRouter);

app.use(history());
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