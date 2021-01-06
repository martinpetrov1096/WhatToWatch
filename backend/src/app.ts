import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import lobbyRouter from './routes/lobbyRoute';
import gameRouter from './routes/gameRoute';


const app = express();
app.use(bodyParser.json());

app.use(lobbyRouter);
app.use(gameRouter);
///////////////////////////////////////////////////////////////////////////
////////////////////////////// EXPRESS START //////////////////////////////
///////////////////////////////////////////////////////////////////////////

app.listen(config.port, () => {
   console.log('what-to-watch listening on port ' + config.port);
});