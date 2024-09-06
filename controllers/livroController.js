const LivroDao = require('../model/livroModel');

const limites = [5, 10, 30];

exports.getLivro = async (req, res) => {
  try {
    const { id } = req.body;
    const livro = await LivroDao.getById(id);
    if (livro) {
      res.status(200).json(livro);
    } else {
      res.status(404).json({ erro: "Livro não encontrado" })
    }
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.getLivros = async (req, res) => {
  try {
    const { limite, pagina } = req.body;
    if (limites.includes(limite) && pagina) {
      const offset = (pagina - 1) * limite;
      const livros = await LivroDao.list(limite, offset);
      res.status(200).json(livros);
    } else {
      res.status(500).json({ erro: 'Deve buscar com limite 5, 10 ou 30 e pagina' });
    }
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.criarLivro = async (req, res) => {
  try {
    const { titulo, autor, preco, editora, genero } = req.body;
    const livro = await LivroDao.save(titulo, autor, preco, editora, genero);
    res.status(200).json(livro);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.atualizarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, preco, editora, genero } = req.body;
    const livro = await LivroDao.update(id, {titulo, autor, preco, editora, genero});
    if (livro === false) {
      res.status(404).json({ erro: 'Livro não encontrado' })
    }
    res.status(200).json(livro);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.excluirLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await LivroDao.delete(id);
    if (livro === false) {
      res.status(404).json({ erro: 'Livro não encontrado' })
    }
    res.status(200).json(livro);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};
