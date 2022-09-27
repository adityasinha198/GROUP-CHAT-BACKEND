const Sequelize=require('sequelize');

const sequelize=require('../util/database.js')

const Chatuser=sequelize.define('chatuser',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username: Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true,
        // primaryKey:true
    },
    phonenumber:{
        type:Sequelize.INTEGER,
        unique:true,
        max:11
    },
    password:Sequelize.STRING,
    
});

module.exports=Chatuser;