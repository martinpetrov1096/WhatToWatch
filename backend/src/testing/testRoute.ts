import express from 'express';


const router = express.Router();

router.get('/lobby', (req,res) => {
   res.sendFile(__dirname + '/test.html');
});

export default router