const { Sequelize } = require("sequelize")

const message_db = new Sequelize("ChatApi-message","root", "",{
  host:"localhost",
  dialect:"mysql"
  })
  
  module.exports = message_db