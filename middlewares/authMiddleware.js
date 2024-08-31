const jwt = require('jsonwebtoken');
const UsuarioDao = require('../model/usuarioModel');

const authMiddleware = async (req, res, next) => {
  const token_full = req.headers['authorization'];
  if (!token_full) return res.status(401).json({ error: 'Nenhum token fornecido' });
  let token = token_full.split(': ')[1]

  try {
    jwt.verify(token, '#Abcasdfqwr', async (err, payload) => {
      if (err) {
        res.status(403).json({ erro: "Acesso negado - Token invalido" })
        return
      }
      const usuario = await UsuarioDao.getByNomeUsuario(payload.usuario);
      req.usuario = usuario
      next()
    })
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.usuario.papel !== 'admin') return res.status(403).json({ error: 'Acesso negado' });
  next();
};

module.exports = { authMiddleware, adminMiddleware };