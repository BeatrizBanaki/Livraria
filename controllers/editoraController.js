const EditoraDao = require('../model/editoraModel');

const limites = [5, 10, 30];

exports.getEditora = async (req, res) => {
  try {
    const { id } = req.body;
    const editora = await EditoraDao.getById(id);
    if (editora) {
      res.status(200).json(editora);
    } else {
      res.status(404).json({ erro: "Editora não encontrada" })
    }
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.getEditoras = async (req, res) => {
  try {
    const { limite, pagina } = req.body;
    if (limites.includes(limite) || pagina) {
      const offset = (pagina - 1) * limite;
      const editoras = await EditoraDao.list(limite, offset);
      res.status(200).json(editoras);
    } else {
      res.status(500).json({ erro: 'Deve buscar com limite 5, 10 ou 30 e pagina' });
    }
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.criarEditora = async (req, res) => {
  try {
    const { nome } = req.body;
    const editora = await EditoraDao.save(nome);
    res.status(200).json(editora);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.atualizarEditora = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    const editora = await EditoraDao.update(id, { nome });
    if (editora === false) {
      res.status(500).json({ erro: 'Editora não encontrada' })
    }
    res.status(200).json(editora);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.excluirEditora = async (req, res) => {
  try {
    const { id } = req.params;
    const editora = await EditoraDao.delete(id);
    if (editora === false) {
      res.status(500).json({ erro: 'Editora não encontrada' })
    }
    res.status(200).json(editora);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};
