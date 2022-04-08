const express = require('express');
const userRoutes = require('./routes/user');
const stuffRoutes = require('./routes/stuff');


const mongoose = require('mongoose');

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

 app.post('/api/sauces', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

// app.get('/api/sauces', (req, res, next) => {
//   const sauces = [
//     {
//       name: 'Mon premier objet',
//       description: 'Les infos de mon premier objet',
//       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//       manufacturer: "fabricant",
//       mainPepper : "ingredient",
//       userId: 'qsomihvqios',
//     },

//   ];
//   res.status(200).json(sauces);
// });





//   const app = express();
// //   app.post('/api/stuff', (req, res, next) => {
// //    delete req.body._id;
// //    const thing = new Thing({
// //      ...req.body
// //    });
// //    thing.save()
// //      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
// //      .catch(error => res.status(400).json({ error }));
// //  });

app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

// //  app.use('/api/stuff', (req, res, next) => {
// //    Thing.find()
// //      .then(things => res.status(200).json(things))
// //      .catch(error => res.status(400).json({ error }));
// //  });

// //  app.get('/api/stuff/:id', (req, res, next) => {
// //    Thing.findOne({ _id: req.params.id })
// //      .then(thing => res.status(200).json(thing))
// //      .catch(error => res.status(404).json({ error }));
// //  });

// //  app.put('/api/stuff/:id', (req, res, next) => {
// //    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
// //      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
// //      .catch(error => res.status(400).json({ error }));
// //  });

// //  app.delete('/api/stuff/:id', (req, res, next) => {
// //    Thing.deleteOne({ _id: req.params.id })
// //      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
// //      .catch(error => res.status(400).json({ error }));
// //  });

module.exports = app;