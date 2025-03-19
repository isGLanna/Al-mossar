const Sequelize = require('sequelize')
const database = require('../db')

const User = database.define('user', {

  email: {
    type: Sequelize.STRING,
    allow: false,
    primaryKey: true
  },

  password: {
    type: Sequelize.STRING,
    allow: false,
    primaryKey: true
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  surname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  startOfContract: {
    type: Sequelize.DATE,
    allowNull: true
  },

  role: {
    type: Sequelize.STRING,
    allowNull: true
  },

  /* Deverá criar tabela e referencia a outra tabela:
      Table: Enterprise
      FK: id
  */
  idInterprise: {
    type: Sequelize.INTEGER,
    allow: true,
    onUpdate: 'CASCADE'
  },
})

module.exports = User