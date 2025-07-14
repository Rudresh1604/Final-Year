const express=require('express');
const { addDoctor } = require('../controllers/doctorController');
const doctorRoutes=express.Router();

doctorRoutes.post("/",addDoctor)

module.exports=doctorRoutes