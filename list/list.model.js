const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Step = new Schema(
    {
      title: {type: String, required: true},
      description: {type: String},
      url: {type: String},
      number: {type: Number, required: true},
    },
    {timestamps: true},
);


const List = new Schema(
    {
      title: {type: String, required: true},
      description: {type: String},
      category: {type: String, required: true},
      numberOfForks: {type: Number, default: 0},
      type: {type: String, required: true},
      parent: {type: String},
      hasForkedBy: [{type: String}],
      userName: {type: String, required: true},
      userLevel: {type: String, required: true},
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: false,
        required: true,
      },
      steps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Step',
        autopopulate: true,
        default: [],
      }],
    },
    {timestamps: true},
);


List.plugin(require('mongoose-autopopulate'));
module.exports = {
  ListModel: mongoose.model('List', List),
  StepModel: mongoose.model('Step', Step),
};
