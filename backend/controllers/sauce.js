const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce ({
    ...sauceObject
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.getOneSauce = (req, res, next) => {
  
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));

};

exports.deleteSauce = (req, res, next) => {
  // Sauce.findOne({ _id: req.params.id }).then(
  //    (sauce) => {
  //      if (!sauce) {
  //        res.status(404).json({
  //          error: new Error('No such Thing!')
  //        });
  //      }
  //      if (sauce.userId !== req.auth.userId) {
  //        res.status(400).json({
  //          error: new Error('Unauthorized request!')
  //        });
  //      }
  //      Sauce.deleteOne({ _id: req.params.id }).then(
  //        () => {
  //          res.status(200).json({
  //            message: 'Deleted!'
  //          });
  //        }
  //      ).catch(
  //        (error) => {
  //          res.status(400).json({
  //            error: error
  //          });
  //        }
  //      );
  //    }
  //  )
  

    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));

 };
 

exports.getAllSauce = (req, res, next) => {
  // Sauce.find().then(
  //   (sauces) => {
  //     res.status(200).json(sauces);
  //   }
  // ).catch(
  //   (error) => {
  //     res.status(400).json({
  //       error: error
  //     });
  //   }
  // );
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error }));
};