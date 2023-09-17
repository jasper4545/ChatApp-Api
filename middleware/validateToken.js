const jwt = require("jsonwebtoken")

const validateToken = (req,res,next)=>{
  const { username, password } = req.body
  try{
  const token = jwt.sign({username, password},process.env.LOGIN_TOKEN, {expiresIn: "30s"})
  req.token = token
  }catch(e){
    console.log("Token Error: "+ e)
    res.status(500).json({e})
  }
  next()
}

module.exports = validateToken