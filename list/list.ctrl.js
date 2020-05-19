/* eslint-disable no-invalid-this */
const {ListModel, StepModel} = require('./list.model');

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
        content: await StepModel.find(),
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
  create: async (req, res, next) => {
    try {
      const body = req.body || {};
      const steps = body.steps || [];
      body.steps = [];
      for (let i = 0; i < steps.length; i++) {
        const step = await StepModel.create(steps[i]);
        body.steps.push(step._id);
      }
      const list = await new ListModel(body);
      await list.save();
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
      const list = await ListModel.findByIdAndUpdate(id, body);
      return res.json({
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
      res.json({
        success: true,
        content: await ListModel.findByIdAndDelete(params.id),
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
        content: await ListModel.deleteMany({}),
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
