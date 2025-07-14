const express=require('express');
const { CreateDisease } = require('../controllers/diseaseController');

const diseaseRoutes=express.Router();

diseaseRoutes.post("/",CreateDisease)

module.exports=diseaseRoutes