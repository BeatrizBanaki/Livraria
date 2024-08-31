const express = require('express');
const router = express.Router();
const { login, criarAdmin, criarUsuario, deletarUsuario, atualizarUsuario } = require('../controllers/usuarioController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.post('/usuarios', criarUsuario);
router.post('/usuarios/login', login);
router.post('/usuarios/admin', authMiddleware, adminMiddleware, criarAdmin);
router.delete('/usuarios/:id', authMiddleware, adminMiddleware, deletarUsuario);
router.put('/usuarios/:id', authMiddleware, atualizarUsuario);

module.exports = router;