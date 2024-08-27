const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');

const Editora = sequelize.define('Editora', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "O nome não pode estar vazio" },
    }
  },
  codigo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

module.exports = {
  getById: async function(id) {
    const editora = await Editora.findByPk(id);
    return editora
  },

  list: async function (limit, offset) {
    const editoras = await Editora.findAndCountAll({ limit, offset });
    return editoras.rows
  },

  save: async function (nome) {
    const editora = await Editora.create({nome})
    return editora
  },

  update: async function (id, obj) {
    let editora = await Editora.findByPk(id)
    if (!editora) {
      return false
    }

    Object.keys(obj).forEach(key => Editora[key] = obj[key])
    await editora.save()
    return editora
  },

  delete: async function (id) {
    const editora = await Editora.findByPk(id)
    return editora.destroy()
  },

  bulkCreate: async function (obj) {
    const editoras = await Editora.bulkCreate(obj)
    return editoras
  },

  Model: Editora
};