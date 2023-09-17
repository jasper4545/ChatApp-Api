const msgDB = require("../model/messagesDB")
const seq = require("sequelize")
async function getData(){
  try{
    const res = await msgDB.findAll({attributes: ["from", [seq.fn("SUM", seq.col("createdAt")), "sum"]],where:{ to:"jason"}, group: "to"})
    console.log(res)
  }catch(e){
    console.log(e)
  }
}

getData()