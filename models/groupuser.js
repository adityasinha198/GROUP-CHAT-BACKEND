const Sequelize=require('sequelize');

const sequelize=require('../util/database.js')

const Groupuser = sequelize.define('groupuser',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    admin:Sequelize.BOOLEAN
    
   
   
})

module.exports =  Groupuser;