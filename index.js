require("dotenv").config()
const express = require("express");
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server, {cors:{origin: "*"}})
const PORT = process.env.PORT || 8000
const cors = require("cors")
const verifyToken = require("./middleware/verifyToken")
const messagesDB = require("./model/messagesDB")

/* middlewre */
app.use(cors(require("./Config/corsConfig")))
app.use((err, req,res,next)=>{
  if(err) console.log("Error happen:"+err.stack)
  next()
})
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require("./middleware/checkDB"))


/* ROUTE */
app.use("/users", require("./routes/userRoute"))

app.use("/messages",require("./routes/messagesRoute.js"))
server.listen(PORT, ()=> console.log("Server is Running at http://localhost:"+PORT))

io.on("connection", socket=>{
  socket.on("join", data=>{
    socket.join(data)
  })
  
  socket.on("message", data=>{
    console.log(socket.rooms)
    io.to(data.to).emit("message", data)
  })
})