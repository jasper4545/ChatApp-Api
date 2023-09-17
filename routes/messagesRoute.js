const express = require("express")
const messagesRoute = express.Router()
const cache = require("../Config/cache")
const messagesDB = require("../model/messagesDB")
const { Sequelize, Op } = require("sequelize")

function checkCache(req,res,next){
  const c = cache.get("messagesTo"+req.headers.name)
  if(c){
   res.status(200).json({"m":"come from caching", data: c})
   return;
  }
  next()
}

messagesRoute.route("/")
  .get(checkCache,async(req,res)=>{
    const { name } = req.headers
    console.log("this is header name "+name)
    try{ 
      const result = await messagesDB.findAll({
        attributes:['from', [Sequelize.fn('max', Sequelize.col('id')), 'id']],
        where:{ to: name},
        group: ['from']
      })
      const ids = result.map(e=>e.id )
      const msgR = await messagesDB.findAll({
        where: {"id": ids}
      })
      const msg = msgR.map(e=>e.dataValues)
      cache.set("messagesTo"+req.headers.name, msg)
      res.status(200).json({"data": msg})
    }catch(e){
      console.log(e)
      return res.sendStatus(500)
    }
    /*
    try{
      const getRes = await messagesDB.findAll()
      res.status(201).json({getRes})
    }catch(e){
      return res.status(500).json({...e, "error": true})
    }*/
  })
  .post(async(req,res)=>{
    console.log(req.body)
    const { to, from, message } = req.body
    try{
     const response = await messagesDB.create({to, from, message})
     if(response) return res.status(200).json({"success": true})
    }catch(e){
      return res.status(500).json({...e})
    }
  })
  
messagesRoute.route("/all")
  .get(async(req,res)=>{
    try{
      const rawData = await messagesDB.findAll()
      res.status(200).json({rawData})
    }catch(e){
      return res.status(500).json({...e})
    }
  })

messagesRoute.route("/:user")
  .get(async(req,res)=>{
    const from = req.params.user
    const to = req.query.to
    const arr = [from, to]
    const os = Number(req.query.offset) || 0
    try{
      const getMsg = await messagesDB.findAll({
        where:{
          "from": arr, "to":arr
        },
        order:[["id", "DESC"]],
        limit:10,
        offset:os
      })
      res.status(200).json({getMsg})
    }catch(e){
      res.status(500).json({"error": e})
    }
  })

module.exports = messagesRoute