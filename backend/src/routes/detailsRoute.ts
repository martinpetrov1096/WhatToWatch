import express from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import { ApiService } from '../services/apiService';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////// CONFIG //////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const router = express.Router();
const apiService = ApiService.getInstance();
///////////////////////////////////////////////////////////////////////////
///////////////////////////////// ROUTES //////////////////////////////////
///////////////////////////////////////////////////////////////////////////


router.get('/', celebrate({
   [Segments.QUERY]: Joi.object().keys({
      type: Joi.string().valid(...['movie', 'tv']).required(),
      id: Joi.number().required()
   }).unknown()
}), async (req, res) => {
   if (!req.query.id || !req.query.type) {
      return res.status(400).json({'Error': 'Missing Id or Type'});
   }
   const id = parseInt(req.query.id.toString());
   const type = req.query.type.toString();
   if (type !== 'movie' && type !== 'tv') {
      return res.status(400).json({'Error': 'type must either be string \'movie\' or \'tv\''})
   }
   
   /**
    * Set a big value for the max age
    * so that the browser uses its 
    * cache if users click on the 
    * details for the same movie/tv
    * multiple times
    */
   apiService.getDetails(id, type)
      .then((details: any) => {
         res.set('Cache-Control', 'public, max-age=31557600');
         return res.status(200).json(details);
      })
      .catch((err: Error) => {
         return res.status(500).json({'Error': 'Something went wrong'});
      })
});

export default router;