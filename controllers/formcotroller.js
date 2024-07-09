const Form = require('../models/form');

exports.createForm = async (req, res) => {
  const { title, fields } = req.body;
  
  if (!title || !fields) {
    return res.status(400).send('Title and fields are required');
  }
  const form = new Form({
    title,
    fields,
    user: req.user._id,
  });

  try {
    const savedForm = await form.save();
    res.status(201).send(savedForm);
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

exports.submitResponse = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).send('Form not found');
    }

    form.responses.push(req.body);
    await form.save();
    res.status(200).send('Response submitted');
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find({ user: req.user._id });
    res.status(200).send(forms);
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};
