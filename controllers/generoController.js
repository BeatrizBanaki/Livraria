const GeneroDao = require('../model/generoModel');

const limites = [5, 10, 30];

exports.getGenero = async (req, res) => {
  try {
    const { id } = req.body;
    const genero = await GeneroDao.getById(id);
    if (genero) {
      res.status(200).json(genero);
    } else {
      res.status(404).json({ erro: "Genero não encontrado" })
    }
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.getGeneros = async (req, res) => {
  try {
    const { limite, pagina } = req.body;
    if (limites.includes(limite) && pagina) {
      const offset = (pagina - 1) * limite;
      const generos = await GeneroDao.list(limite, offset);
      res.status(200).json(generos);
    } else {
      res.status(500).json({ erro: 'Deve buscar com limite 5, 10 ou 30 e pagina' });
    }
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.criarGenero = async (req, res) => {
  try {
    const { nome, subgenero } = req.body;
    const genero = await GeneroDao.save(nome, subgenero);
    res.status(200).json(genero);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.atualizarGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, subgenero } = req.body;
    const genero = await GeneroDao.update(id, { nome, subgenero });
    if (genero === false) {
      res.status(500).json({ erro: 'Genero não encontrado' })
    }
    res.status(200).json(genero);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.excluirGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const genero = await GeneroDao.delete(id);
    if (genero === false) {
      res.status(500).json({ erro: 'Genero não encontrado' })
    }
    res.status(200).json(genero);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};
