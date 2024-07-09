const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fields: { type: Array, required: true },
  responses: { type: Array, default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
