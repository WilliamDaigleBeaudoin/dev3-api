const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Meme = require("../models/Meme");
/// GET Toutes les tâches 
router.get('/', async (req, res) => {
  try {    
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Meme.find());
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});


router.get('/favorie', async (req, res) => {
  try {    
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Meme.find({'favorie': true}));
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});



router.get('/tags/:tag', async (req, res) => {
  try {    
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Meme.find({ tags:  req.params.tag}));
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});

router.get('/total/tags', async (req, res) => {
  try {    
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Meme.aggregate([
      {$unwind:"$tags"},
      {$group:{"_id":"$tags", "count":{"$sum":1}}}]));
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});

router.get('/moyenne/click/theme', async (req, res) => {
  try {    
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Meme.aggregate([{
    
      $group: {
        _id: "$theme",
        moyenne: { $avg: "$nombre_de_click" }
      }
    },
    {
      $sort: { moyenne:1}
    },
    {
      $project: {
        _id: 0,
        theme: "$_id", 
        moyennes: "$moyenne"            
      }}
    ]));
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});

router.get('/:id', async (req, res) => {
  try {    
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Meme.find({'_id': req.params.id}));
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});


router.post('/', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await new Meme(req.body).save());
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ erreur: 'Une erreur est survenue, veuillez contacter votre administrateur' });
  } finally {
    mongoose.connection.close();
  }
});

router.put('/:id', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Meme.updateOne( {_id:req.params.id}  ,req.body));
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ erreur: 'Une erreur est survenue, veuillez contacter votre administrateur' });
  } finally {
    mongoose.connection.close();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Meme.deleteOne({_id : req.params.id} ));
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ erreur: 'Une erreur est survenue, veuillez contacter votre administrateur' });
  } finally {
    mongoose.connection.close();
  }
});



module.exports = router;
