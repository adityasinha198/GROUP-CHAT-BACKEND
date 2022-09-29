const path = require('path');

const express = require('express');

const app = express();
const cors=require('cors')

const Chatuser = require('./models/chatuser')
const Message = require('./models/message')
const Group = require('./models/group')
const Groupuser = require('./models/groupuser')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors())

const sequelize = require('./util/database')
const signup=require('./routes/signup')
const message =require('./routes/message')
const group = require('./routes/creategroup')

app.use(signup)
app.use(message)
app.use(group)

Chatuser.hasMany(Message)
Message.belongsTo(Chatuser)

Chatuser.belongsToMany(Group, { through : Groupuser})
Group.belongsToMany(Chatuser, { through: Groupuser})

Group.hasMany(Message)
Message.belongsTo(Group)




sequelize
//.sync({force: true}) //
.sync()
.then(result=>{
    app.listen(8000)
    console.log(result)    //console.log(result)
   

})
.catch(err => console.log(err))
