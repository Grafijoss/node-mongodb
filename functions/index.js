const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
// CORS
const cors = require("cors");

// para esconder user y passowrd
// firebase functions:config:set
// seguido de la variable que vamos a configurar
// mongo.username=lilola
// mongo.password=A123456789
// firebase functions:config:set mongo.username=lilola
// firebase functions:config:set mongo.password=A123456789
// debemos deployar los cambios
// firebase deploy

// envolvemos la url con los tactics ``
// hacemos destructurin de username y password
const { username, password } = functions.config().mongo;

const mongoUri = `mongodb+srv://${username}:${password}@cluster0.kflco.mongodb.net/test?retryWrites=true&w=majority`;

const mongooseConfig = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(mongoUri, mongooseConfig);

const app = express();

// Modelo
// Podemos acceder a los metodos
// find, create, save, ....
const Pets = require("./Pets");

const createServer = () => {
  // estamos habilitando que otros dominios hagan peticiones
  app.use(cors({ origin: true }));

  /* GUARDA UNA MASCOTA
  // http://localhost:5001/test-api-76efe/us-central1/api/pets
  app.get("/pets", (req, res) => {
    const pet = new Pets({
      name: "Cerdito triste :(",
      type: "Cerdo",
      description: "Esta triste por que su amigo no para de comer",
    });
    pet.save();
    res.send("se guardaron los datos");
  });
  // una vez guardaddo
  // podeemos revisarlo en cluster/collections
  */

  // RETORNA LA COLLECION DE MASCOTAS
  // http://localhost:5001/test-api-76efe/us-central1/api/pets
  // nos va a retornar una promesa
  // usamos la palabra reservada async
  app.get("/pets", async (req, res) => {
    // find para que busque
    // exec para que encuente
    const result = await Pets.find({}).exec();
    // retorna la collection
    // enviamos el resultado al cliente
    res.send(result);
  });

  // CREA UNA NUEVA MASCOTA
  app.post("/pets", async (req, res) => {
    // body es name, type, descrition
    // del objeto Pets
    const { body } = req;

    // creamos una instancia de pet
    // le pasamos body
    const pet = new Pets(body);
    // guardamos a pet
    // retorna una promesa
    await pet.save();
    // le notificamos al cliente
    // que se creo de manera exitosa
    // usamos el sendStatus() 204
    res.sendStatus(204);
  });

  // DAR DE ALTA A UNA MASCOTA
  app.get("/pets/:id/daralta", async (req, res) => {
    // params hace referencia a los queryparams
    // sque se estan pasando en la url /:id
    // (/:lala) ejemplo otor param
    const { id } = req.params;
    // para eliminar el recurso
    // donde nosotros le indicamos el atributo
    // pr el cual vamos a identificar al recurso
    // mongo guarda los id como _id
    // deleteOne nos va a devolver una query
    // tenemos que ejecutar la query con exec
    // y nos regresa una promesa
    await Pets.deleteOne({ _id: id }).exec();
    // le notificamos al cliente
    // que se elimino de manera exitosa
    res.sendStatus(204);
  });

  return app;
};

exports.api = functions.https.onRequest(createServer());

// para correr el servidor usamos yarn serve
