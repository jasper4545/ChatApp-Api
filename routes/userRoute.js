const express = require("express")
const userRoute = express.Router()
const validateToken = require("../middleware/validateToken")
const verifyToken = require("../middleware/verifyToken")
const usersDB = require("../model/usersDB")

userRoute.route("/")
  .get( async(req,res)=>{
    const users = await usersDB.findAll({exclude:{"name": "japee"}})
    res.status(200).json({"success": true, "users": users})
  })
/* login middleware */
async function loginData(req,res,next){
  const { username, password } = req.body
  if(!username || !password) return res.status(301).json({"error": "all fields are required"})
  
  try{
    const isLogin = await usersDB.findAll({where:{username, password}})
    req.nameUser= isLogin[0].dataValues.name
    if(isLogin.length === 0) return res.status(300).json({"error": "no such user"})
  }catch(e){
    console.log("error: " +e)
    return res.status(500).json({...e})
  }
  next()
}

userRoute.route("/login")
  .post(loginData,validateToken,(req,res)=>{
    const { username, password } = req.body
    res.status(200).json({"success": true, "token": req.token, "name": req.nameUser})
  })
  /* userCheck middleware */
  async function userCheck(req,res,next){
    const { username, password } = req.body
    try{
    const isLogin = await usersDB.findAll({where:{username, password}})
    if(isLogin.length > 0) return res.status(300).json({"error": "User already Exist"})
  }catch(e){
    return res.status(500).json({...e})
  }
  next()
  }
  userRoute.route("/register")
    .post(userCheck, async(req,res)=>{
      const {name, username, password } = req.body;
      try{
      await usersDB.create({name,username, password})
      res.status(200).json({"success":true})
      }catch(e){
        return res.status(500).json({...e})
      }
    })
  module.exports = userRoute