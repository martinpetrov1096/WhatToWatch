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

router.post('/new', celebrate({
   [Segments.BODY]: Joi.object().keys({
      type: Joi.string().required()
   }).unknown(),
}),async (req, res) => {

   const type = req.body.type;
   if (type != 'movie' && type != 'tv-show') {
      return res.status(400).json({'Error': 'type must be either movie or tv-show'});
   }
   let newGame = lobbyService.new(type);
   res.status(200).json(newGame);
});



export default router;