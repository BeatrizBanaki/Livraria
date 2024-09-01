const express = require('express');
const router = express.Router();
const { aplicarDesconto, removerDesconto } = require('../controllers/promocaoController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.post('/promocoes/aplicar-desconto', authMiddleware, adminMiddleware, aplicarDesconto)
router.post('/promocoes/remover-desconto', authMiddleware, adminMiddleware, removerDesconto);

module.exports = router;
