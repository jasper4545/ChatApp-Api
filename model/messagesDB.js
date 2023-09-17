const db = require("../model/message_db")
const { DataTypes } = require("sequelize")

const messagesDB = db.define("messages", {
  from:{
    type: DataTypes.STRING,
    allownull: false
  },
  to:{
   type: DataTypes.STRING,
    allownull: false
  },
 message:{
    type: DataTypes.STRING,
    allownull: false
  },
})
module.exports = messagesDB