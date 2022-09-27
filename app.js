const path = require('path');

const express = require('express');

const app = express();
const cors=require('cors')

const Chatuser = require('./models/chatuser')
const Message = require('./models/message')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors())

const sequelize = require('./util/database')
const signup=require('./routes/signup')
const message =require('./routes/message')

app.use(signup)
app.use(message)


Chatuser.hasMany(Message)
Message.belongsTo(Chatuser)





sequelize
//.sync({force: true}) //
.sync()
.then(result=>{
    app.listen(8000)
    console.log(result)    //console.log(result)
   

})
.catch(err => console.log(err))
