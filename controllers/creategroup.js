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
        groupId:groupid
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
        console.log(arr)
        
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
