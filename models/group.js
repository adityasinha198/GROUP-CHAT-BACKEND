const Sequelize=require('sequelize');

const sequelize=require('../util/database.js')

const Group = sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        
    },
    groupname: {
        type:Sequelize.STRING,
        unique:true,
    }
   
});

module.exports =  Group;