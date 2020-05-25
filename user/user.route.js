const express = require('express');
const router = new express.Router();
require('dotenv').config();

const {
  authenticate,
  create,
  deleteByID,
  deleteMany,
  getAll,
  getOne,
} = require('./user.ctrl');


router.get('/api/user/get/all', getAll);
router.get('/api/user/get/one/:id', getOne);

router.post('/api/user/create', create);
router.post('/api/user/auth', authenticate);

router.delete('/api/user/delete/:id', deleteByID);
router.delete('/api/user/delete', deleteMany);


module.exports = router;
