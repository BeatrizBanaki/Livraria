const express = require('express');
const router = express.Router();
const { criarEditora, atualizarEditora, excluirEditora, getEditoras, getEditora } = require('../controllers/editoraController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/editoras/:id', authMiddleware, getEditora)
router.get('/editoras', authMiddleware, getEditoras)
router.post('/editoras', authMiddleware, criarEditora);
router.delete('/editoras/:id', authMiddleware, excluirEditora);
router.put('/editoras/:id', authMiddleware, atualizarEditora);

module.exports = router;