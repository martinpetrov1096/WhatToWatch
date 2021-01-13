import express from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import { LobbyService } from '../services/lobbyService';
import { GameService } from '../services/gameService';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////// CONFIG //////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const router = express.Router();
const lobbyService = LobbyService.getInstance();
const gameService = GameService.getInstance();
///////////////////////////////////////////////////////////////////////////
///////////////////////////////// ROUTES //////////////////////////////////
///////////////////////////////////////////////////////////////////////////

router.post('/', async (req, res) => {
   let newGame = lobbyService.new('movie');
   res.status(200).json(newGame);
});

router.get('/', celebrate({
   [Segments.QUERY]: Joi.object().keys({
      id: Joi.string().alphanum().length(5).required()
   }).unknown(),
}), async (req, res) => {
   if (!req.query.id) {
      return res.status(400).json({'Error': 'Missing Id'});
   }
   const id = req.query.id.toString();

   if (await lobbyService.checkLobby(id)) {
      return res.status(200).json({'Status': 'Lobby'});
   } else if (await gameService.checkGame(id)) {
      return res.status(200).json({'Status': 'Game'});
   } else {
      return res.status(404).json({'Status': 'Not Found'});
   }
});

export default router;