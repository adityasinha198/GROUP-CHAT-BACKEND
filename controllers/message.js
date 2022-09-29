const Chatuser = require("../models/chatuser")
const Message = require("../models/message")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.postmessage = (req,res,next) => {
    console.log("Hello")
    const groupid = req.params.groupid
    console.log(groupid,"Nice")
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
        chatuserId:chatuserId,
        groupId:groupid
       
      })
      .then(result => {
        console.log(result.id,"Y")
        res.json(result)
          
       
      })
      .catch(err => {
        console.log(err);
      });

}


exports.getmessage = (req,res,next) => {
  console.log(req.params.query,"12333")
  // req.parms.query
  //console.log(query)
  const groupid = req.header("groupid")
  console.log(groupid,"Comming bro")

    Message.findAll({where:{groupId:groupid}})
    .then(messages => {
      
      if(req.params.query == "abc"){

        // if(messages.length == 0){
        //   res.json("No chats present")
        // }
        console.log("Hello")

    
       // console.log(messages)
        res.json({messages:messages})
      }

      else{
        const arr = []
        for(let i= 0;i<messages.length;i++){
          if(messages[i].id >req.params.query){
            arr.push(messages[i])
          }
        }
        //console.log(messages)
        res.json({messages:arr})
      }

      
    })
    .catch(err => console.log(err))
}



