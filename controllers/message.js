const Chatuser = require("../models/chatuser")
const Message = require("../models/message")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.postmessage = (req,res,next) => {
    console.log("Hello")
    const message = req.body.message
    const a = req.user
    const chatuserId = a.id
    const username = a.username
    console.log(a.id)
    console.log(message,"Nice")
    
    Message
    .create({
        username:username,
        message:message,
        chatuserId:chatuserId
       
      })
      .then(result => {
        res.json(result)
          
       
        
    
        console.log('Created ExpenseUser');
    })
      .catch(err => {
        console.log(err);
      });

}


exports.getmessage = (req,res,next) => {

    Message.findAll()
    .then(messages => {
        console.log(messages)
        res.json({messages:messages})
    })
    .catch(err => console.log(err))
}



