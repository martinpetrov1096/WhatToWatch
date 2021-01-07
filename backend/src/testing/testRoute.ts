import express from 'express';


const router = express.Router();

router.get('/lobby', (req,res) => {
   res.sendFile(__dirname + '/lobbyTest.html');
});
router.get('/game', (req,res) => {
   res.sendFile(__dirname + '/gameTest.html');
});

export default router