const mongoose = require('mongoose');

const luzSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  intensidad: {
    type: Number,
    default: 100
  },
  estado: {
    type: Boolean,
    default: false
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Luz', luzSchema);
