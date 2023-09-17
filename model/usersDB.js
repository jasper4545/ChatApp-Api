const { DataTypes } = require("sequelize")
const db = require("../model/db")

const usersDB = db.define("users", {
  name:{
    type: DataTypes.STRING,
    allownull:false
  },
  username:{
    type: DataTypes.STRING,
    allownull:false
  },
  password:{
    type: DataTypes.STRING,
    allownull:false
  }
})
module.exports = usersDB