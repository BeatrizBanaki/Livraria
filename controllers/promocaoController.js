const LivroDao = require('../model/livroModel');

exports.aplicarDesconto = async (req, res) => {
  try {
    const { desconto } = req.body;
    const livros = await LivroDao.listAll();
    for (const livro of livros) {
      await LivroDao.update(
        livro.id,
        {
          titulo: livro.titulo,
          autor: livro.autor,
          preco: livro.preco * (desconto / 100),
          editora: livro.editora,
          genero: livro.genero
        }
      );
    }
    const livrosDesconto = await LivroDao.listAll();
    res.status(200).json(livrosDesconto);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};

exports.removerDesconto = async (req, res) => {
  try {
    const { desconto } = req.body;
    const livros = await LivroDao.listAll();
    for (const livro of livros) {
      await LivroDao.update(
        livro.id,
        {
          titulo: livro.titulo,
          autor: livro.autor,
          preco: livro.preco / (desconto / 100),
          editora: livro.editora,
          genero: livro.genero
        }
      );
    }
    const livrosDesconto = await LivroDao.listAll();
    res.status(200).json(livrosDesconto);
  } catch (err) {
    const erros = err.errors.map(erro => erro.message);
    res.status(500).json({ erro: erros });
  }
};
