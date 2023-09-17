const { Sequelize, Op } = require("sequelize")
const messagesDB = require("../model/messagesDB")

async function getMessage(){
  const result = await messagesDB.findAll({
    where:{
      "from": ["jaizel","japee"], "to":["jaizel","japee"]
    },
    order:[["id", "DESC"]],
    limit:10
  })
    console.log(result)
 
}
getMessage()