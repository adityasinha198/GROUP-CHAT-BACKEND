const Chatuser = require("../models/chatuser")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Group = require("../models/group")
const Groupuser = require("../models/groupuser")
const Message = require("../models/message")
const { where } = require("sequelize")

exports.postcreategroup = (req,res,next) =>{

    //var groupid  ;
    const userid = req.user.id
    console.log(userid,"Final Call")

    console.log("hello")
    const groupname = req.body.group
    console.log(groupname)
    Group.
    create({
        groupname:groupname
    })
   

    .then(results =>{
        console.log(userid)
    console.log(results.id,"Noo")
    const groupid = results.id
    
    Groupuser.create({
        chatuserId:userid,
        groupId:groupid,
        admin:true,
    })
    .then(results =>{
        res.json(results)
        

    })
    .catch(err => {
        console.log(err)
    })
    
    .catch(err => console)


     
    //res.json({groupname:groupname})
})
    
.catch(err => console.log(err))


}

exports.getaddmember = (req,res,next) => {
    console.log(req)
    
    
    Chatuser.findAll()
    .then(members => {
        res.json(members)
    })
    .catch(err => console.log(users))
}

exports.postaddmembergroup = (req,res,next ) =>{
    console.log("Hello bhai")
    console.log(req)
    console.log(req.body.userid,"Fine")
    console.log(req.body.groupid,"Not")
    Groupuser
    .create({
        chatuserId:req.body.userid,
        groupId:req.body.groupid
    })
    .then(result => {
        //console.log(result)
        res.json(result)
    })
    .catch(err => {
        console.log(err)
    })



}

exports.showgroups = async(req,res,next) =>{
    console.log('Hello world')
    let arr = []

    console.log(req)
    const a = req.user
    console.log(a.id)
    let result = await Groupuser.findAll({where:{chatuserId:a.id}})
   
    for(let i=0;i<result.length;i++){

            let values = await Group.findByPk(result[i].groupId)
            arr.push(values)
                

            

        }
        res.json({groupname:arr})
        //console.log(arr)
        
    }


exports.groupchats = (req,res,next) =>{
    const abc = req
    console.log("In it comming")
    console.log(req.params.groupid,"Working")
    const groupid = req.params.groupid
    
    
    Message.findAll({where:{groupId:groupid}})
    .then(messages =>{
        
        res.json({messages:messages})
    })


    .catch(err => console.log(err))
    

}

exports.makeadmin = async(req,res,next) =>{
    let arr = []
    const a = req.user
    const chatuserId = a.id
    console.log(chatuserId,"Cool")
    const abc = req 
    //console.log(req)
    const groupid = req.params.groupid
    console.log(groupid,"working")
    let confirm = 0

    let users = await Groupuser.findAll({where:{groupId:groupid}})
    
    for(let j=0;j<users.length;j++){
        if(users[j].chatuserId==chatuserId && users[j].admin==true){
            confirm = confirm + 1

        }
    }

    if(confirm == 1)
   {
    for(let i=0;i<users.length;i++){
        

            let members = await Chatuser.findByPk(users[i].chatuserId)
            arr.push(members)

                

            

        }

        res.json({members:arr})
    }
    
    else{

        res.json("You are not premium user")
    }

    }



    
exports.postmakeadmin = async(req,res,next) =>{
    console.log("In delete")

        const abc = req
        console.log(abc)

        const userid = req.body.userid
        const groupid = req.body.groupid
        console.log(userid,groupid,"nice")
        try{

       const user = await Groupuser.findAll({where:{chatuserId:userid,groupId:groupid}})

       console.log(user[0].chatuserId,"Working")
       user[0].update({admin:true})
        
    }


        catch(err){

            
            console.log(err)
        
        }
   
    }

    exports.deleteuser = async(req,res,next) =>{
        
        const acbc = req
        //console.log(abc) 
        console.log("In delete")

        const userid = req.header("userid")
        const groupid = req.header("groupid")
        console.log(userid,groupid,"itsworking")

        try{

            const user = await Groupuser.findAll({where:{chatuserId:userid,groupId:groupid}})
     
            console.log(user[0].chatuserId,"Working")
            user[0].destroy()
            //res.json("User deleted")
             
         }
     
     
             catch(err){
     
                 
                 console.log(err)
             
             }
        

    }