const express = require('express')
const app = express()
const port = 2019
const userRouter = require('./routers/cinemaBooking')

app.get('/',(req,res)=>{
    res.send(`<h1> API running on PORT</h1>`)
})


app.use(express.json())
app.use(userRouter)

app.listen(port,()=>{
    console.log("running at",port);
})