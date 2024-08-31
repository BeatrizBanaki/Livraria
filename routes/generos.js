const express = require('express');
const router = express.Router();
const { criarGenero, atualizarGenero, excluirGenero, getGeneros, getGenero } = require('../controllers/generoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/generos/:id', authMiddleware, getGenero)
router.get('/generos', authMiddleware, getGeneros)
router.post('/generos', authMiddleware, criarGenero);
router.delete('/generos/:id', authMiddleware, excluirGenero);
router.put('/generos/:id', authMiddleware, atualizarGenero);

module.exports = router;