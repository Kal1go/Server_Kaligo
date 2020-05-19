const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Step = new Schema(
    {
      title: {type: String, required: true},
      description: {type: String, required: true},
      url: {type: String, required: true},
    },
    {timestamps: true},
);

const List = new Schema(
    {
      title: {type: String, required: true},
      description: {type: String, required: true},
      category: {type: String, required: true},
      numberOfForks: {type: Number, default: 0},
      type: {type: String, required: true},
      steps: [{
        type: Step,
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
