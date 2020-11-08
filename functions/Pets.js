const mongoose = require("mongoose");

const Pets = mongoose.model("Pet", {
  // los tipos pueden ser Number, Boolean, {}. []
  // Los objetos tambien prueden tener propiedades por dentro
  // [String] puede ser un arreglo de strings
  name: String,
  type: String,
  description: String,
});

module.exports = Pets;
