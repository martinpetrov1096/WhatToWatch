import express from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import { LobbyService } from '../services/lobbyService';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////// CONFIG //////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const router = express.Router();
const lobbyService = LobbyService.getInstance();
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
      return res.status(200).json();
   } else {
      return res.status(404).json();
   }
});

export default router;