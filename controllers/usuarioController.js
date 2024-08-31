const jwt = require('jsonwebtoken');
const UsuarioDao = require('../model/usuarioModel');

exports.login = async (req, res) => {
  try {
    const { nomeUsuario, senha } = req.body;
    const usuario = await UsuarioDao.getByNomeUsuario(nomeUsuario);
    if (senha === usuario.senha) {
      const token = jwt.sign({ usuario: nomeUsuario }, '#Abcasdfqwr', {
        expiresIn: '20 min'
      });
      res.status(200).json({ token });
    } else {
      res.status(500).json({ erro: 'Senha inválida' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao realizar login' });
  }
};

exports.criarAdmin = async (req, res) => {
  try {
    if (req.usuario.papel !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    const { nomeUsuario, senha, idade, email } = req.body;
    const result = await UsuarioDao.save(nomeUsuario, senha, idade, email, 'admin');
    res.status(200).json({ sucesso: result });
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.criarUsuario = async (req, res) => {
  try {
    const { nomeUsuario, senha, idade, email } = req.body;
    const result = await UsuarioDao.save(nomeUsuario, senha, idade, email, 'usuario');
    res.status(200).json({ sucesso: result });
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.deletarUsuario = async (req, res) => {
  try {
    if (req.usuario.papel !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    const { id } = req.params;
    const usuarioParaDeletar = await UsuarioDao.getById(id);

    if (!usuarioParaDeletar) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    if (usuarioParaDeletar.papel === 'admin') {
      return res.status(403).json({ erro: 'Não é possível deletar um usuário administrador' });
    }

    const result = await UsuarioDao.delete(id);
    res.status(200).json({ sucesso: result });
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeUsuario, senha, idade, email } = req.body;
    const usuarioParaAtualizar = await UsuarioDao.getById(id);

    if (!usuarioParaAtualizar) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    if (req.usuario.papel !== 'admin' && usuarioRequest.nomeUsuario !== usuarioParaAtualizar.nomeUsuario) {
      return res.status(403).json({ erro: 'Você só pode atualizar o seu próprio perfil' });
    }
    const result = await UsuarioDao.update(id, { nomeUsuario, senha, idade, email });
    res.status(200).json({ sucesso: result });
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};