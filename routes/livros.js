const express = require('express');
const router = express.Router();
const { criarLivro, atualizarLivro, excluirLivro, getLivros, getLivro } = require('../controllers/livroController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/livros/:id', authMiddleware, getLivro)
router.get('/livros', authMiddleware, getLivros)
router.post('/livros', authMiddleware, criarLivro);
router.delete('/livros/:id', authMiddleware, excluirLivro);
router.put('/livros/:id', authMiddleware, atualizarLivro);

module.exports = router;
