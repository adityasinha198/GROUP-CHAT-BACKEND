const path = require('path');

const express = require('express');

const groupController = require('../controllers/creategroup');
const authenticate = require('../middleware/auth')

const router = express.Router();
router.post('/creategroup',authenticate.authenticate,groupController.postcreategroup )
router.get('/addmember',groupController.getaddmember)
router.post('/addgroupmember',groupController.postaddmembergroup)
router.get('/showgroups',authenticate.authenticate,groupController.showgroups)
router.get('/groupchats/:groupid',groupController.groupchats)


module.exports = router //