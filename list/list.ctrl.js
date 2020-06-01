/* eslint-disable no-invalid-this */
const {ListModel, StepModel} = require('./list.model');
const {UserModel} = require('../user/user.model');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        content: await ListModel.find(),
        message: 'Lists encontradas!',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  getAllSteps: async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        content: await StepModel.find({}),
        message: 'Lists encontradas!',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  getByID: async (req, res, next) => {
    const params = req.params || {};
    try {
      if (!params.id) {
        throw new Error('`_id` é requirido.');
      }
      res.json({
        success: true,
        content: await ListModel.findById(params.id),
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  getLast: async (req, res, next) => {
    const params = req.params || {};
    try {
      const number = Number(params.number || 0);
      if (!number && number != 0) {
        throw new Error('`number` é requirido and it is of type Number');
      }
      const query = {};
      const projection = {};
      const options = {
        sort: {
          date: -1,
        },
        limit: number * 10 * 2,
        skip: number * 10,
      };

      const lists = await ListModel.find(query, projection, options);

      console.log(lists.length);
      res.json({
        success: true,
        content: lists,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  create: async (req, res, next) => {
    try {
      const body = req.body || {};
      let steps = [];
      try {
        steps = JSON.parse(body.steps) || [];
        body._id = undefined;
      } catch (error) {
        steps = body.steps;
      }
      body.steps = [];
      const user = await UserModel.findById(body.userID);
      if (!user) {
        throw new Error('User not found');
      }
      for (let i = 0; i < steps.length; i++) {
        steps[i]._id = undefined;
        const step = await StepModel.create(steps[i]);
        body.steps.push(step._id);
      }
      const list = await ListModel.create(body);
      user.list.push(list);

      await list.save();
      await user.save();
      return res.json({
        success: true,
        message: 'List criada com successo!',
        content: list,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  update: async (req, res, next) => {
    const body = req.body || {};
    const id = body._id;
    try {
      let steps = [];
      try {
        steps = JSON.parse(body.steps) || [];
      } catch (error) {
        steps = body.steps;
      }
      body.steps = [];

      for (let i = 0; i < steps.length; i++) {
        let stepId;
        let step;
        if (steps[i]._id == '') {
          steps[i]._id = undefined;
          step = await StepModel.create(steps[i]);
          stepId = step._id;
        } else {
          stepId = steps[i]._id;
          step = await StepModel.findByIdAndUpdate(
              stepId,
              {$set: steps[i]},
              {new: true},
          );
        }
        body.steps.push(stepId);
      }
      const list = await ListModel.findByIdAndUpdate(
          id,
          {$set: body},
          {'new': true},
      );
      res.json({
        success: true,
        content: list,
      });
    } catch (error) {
      return next(error);
    }
  },
  deleteByID: async (req, res, next) => {
    const params = req.params || {};
    try {
      if (!params.id) {
        throw new Error('`_id` é requirido.');
      }
      const list = await ListModel.findByIdAndDelete(params.id);
      if (!list) {
        throw new Error('List not found');
      }
      for (let i = 0; i <= list.steps; i++) {
        list.steps[i] = await StepModel.findByIdAndDelete(list.steps[i]);
      }
      list.steps = [];
      res.json({
        success: true,
        content: list,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  deleteMany: async (req, res, next) => {
    try {
      res.json({
        success: true,
        content: [await ListModel.deleteMany({}),
          await StepModel.deleteMany({})],
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
