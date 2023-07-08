require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const connectDb = require('./config/dbConn')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const logEvents = require('./services/logger')
const logger=logEvents("server")
const helmet = require('helmet');
const morgan = require('morgan');
const route = require('./routes/root')
const cors = require('cors')



connectDb()
app.use(cookieParser())
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors(corsOptions))

app.use('/' , express.static(path.join( __dirname , "public")))
app.use('/' , route)

app.all('*'   ,   (req , res)=>{
    res.status(404)
    logger.info("404 page")
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname , "views" , "404.html"))
    }
    else if(req.accepts('json')) {
        logger.info("page not found")
        res.send({message : "page not found"})
    }
    else{
        logger.info("page not found")
        res.type('text').send('404 page not found')
    }
})
mongoose.connection.once('open' , ()=> console.log('connected to DB'))
app.listen (PORT , ()=> logger.info(`Running on port ${PORT}`))