const express = require('express');
const mongoose = require('mongoose');
// const Sauce = require('./models/Sauce');

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://userceline:umjK6b7P3A9@piiquantedb.br8s1.mongodb.net/piiquanteDB?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api/auth', userRoutes);

app.post('/api/sauces', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
  // delete req.body._id;
  // const sauce = new Sauce ({
  //   ...req.body
  // });
  // sauce.save()
  // .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  // .catch(error => res.status(400).json({ error }));
});





module.exports = app;