const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');

const Genero = sequelize.define('Genero', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "O nome não pode estar vazio" },
    }
  },
  subgenero: {
    type: DataTypes.STRING,
  },
  codigo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

module.exports = {
  getById: async function(id) {
    const genero = await Genero.findByPk(id);
    return genero
  },

  list: async function (limit, offset) {
    const generos = await Genero.findAndCountAll({ limit, offset });
    return generos.rows
  },

  save: async function (nome, subgenero) {
    const genero = await Genero.create({nome, subgenero})
    return genero
  },

  update: async function (id, obj) {
    let genero = await Genero.findByPk(id)
    if (!genero) {
      return false
    }

    Object.keys(obj).forEach(key => Genero[key] = obj[key])
    await genero.save()
    return genero
  },

  delete: async function (id) {
    const genero = await Genero.findByPk(id)
    return genero.destroy()
  },

  bulkCreate: async function (obj) {
    const genero = await Genero.bulkCreate(obj)
    return genero
  },

  Model: Genero
};