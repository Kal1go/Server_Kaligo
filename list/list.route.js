const express = require('express');
const router = new express.Router();
require('dotenv').config();

const {
  update,
  create,
  deleteByID,
  deleteMany,
  getAll,
  getByID,
  getAllSteps,
} = require('./list.ctrl');


router.get('/api/list/get/all', getAll);
router.get('/api/list/:id', getByID);

router.post('/api/list/create', create);
router.post('/api/list/update', update);

router.get('/api/list/delete/:id', deleteByID);
router.delete('/api/list/delete', deleteMany);

// Step
router.get('/api/step/get/all', getAllSteps);

module.exports = router;
