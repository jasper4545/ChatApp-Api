const corsConfig = {
  origin:(origin, callback)=>{
    if(!origin || origin === "http://localhost:7700") callback(null, true)
  }
}  
module.exports = corsConfig
