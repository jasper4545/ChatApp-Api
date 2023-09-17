const messagesDB = require("../model/messagesDB")
const cache = require("../Config/cache")
const usersDB = require("../model/usersDB")


function checkDB(req,res,next){
  usersDB.addHook("afterCreate", async(i)=>{
    const users = usersDB.findAll()
    cache.set("users", users)
  })
  messagesDB.addHook("afterCreate", (instance)=>{
    if(instance.dataValues.from != req.headers.name){
    cache.del("messagesTo"+req.headers.name)
    }
  })
  next()
}
module.exports = checkDB