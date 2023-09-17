const { Sequelize } = require("sequelize")

const db = new Sequelize("ChatApp-Api","root","", {
  host:"localhost",
  dialect: "mysql"
})
module.exports = db