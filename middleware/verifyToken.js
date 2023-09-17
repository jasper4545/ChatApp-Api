const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
   const clientToken = req.headers.token || undefined;
   if(!clientToken) return res.sendStatus(403)
  try{
    jwt.verify(clientToken, process.env.LOGIN_TOKEN)
  }catch(e){
    console.log("Verify Token Error: "+e)
   return res.status(401).json({...e})
  }
  next()
}

module.exports = verifyToken