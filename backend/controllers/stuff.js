const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
  const sauce = new Sauce({
    name: req.body.sauce.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    manufacturer: req.body.manufacturer,
    mainPepper: req.body.mainPepper,
    heat:req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
  });
  console.log(req.body)
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// exports.createThing = (req, res, next) => {
// 	const thingObject = JSON.parse(req.body.sauce);
// 	const thing = new Thing({
// 	  ...thingObject,
// 	  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
// 	});
// 	thing.save()
// 	.then(() => {res.status(201).json({message: "La sauce est enrengistrée !"})})
// 	.catch(() => {res.status(400).json({message: "La sauce n'a pas pu être enrengistrée"})})
//   };

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const sauce = new Sauce({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
     (sauce) => {
       if (!sauce) {
         res.status(404).json({
           error: new Error('No such Thing!')
         });
       }
       if (sauce.userId !== req.auth.userId) {
         res.status(400).json({
           error: new Error('Unauthorized request!')
         });
       }
       Sauce.deleteOne({ _id: req.params.id }).then(
         () => {
           res.status(200).json({
             message: 'Deleted!'
           });
         }
       ).catch(
         (error) => {
           res.status(400).json({
             error: error
           });
         }
       );
     }
   )
 };
 

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};