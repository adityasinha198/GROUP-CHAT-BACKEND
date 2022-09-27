const Chatuser = require("../models/chatuser")
const Message = require("../models/message")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.postmessage = (req,res,next) => {
    console.log("Hello")
    const message = req.body.message
    const a = req.user
    const chatuserId = a.id
    console.log(a.id)
    console.log(message,"Nice")
    
    Message
    .create({
        message:message,
        chatuserId:chatuserId
       
      })
      .then(result => {
          
       
        
    
        console.log('Created ExpenseUser');
    })
      .catch(err => {
        console.log(err);
      });

}




