const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemeSchema = new Schema(
  {
    nom:{
      type: String, 
      required: true, 
    },
    nombre_de_click:{
      type: Number,
      default: 0
    },
    annee_de_creation:{
        type: Date,
        required: true,
    },
    favorie:{
        type: Boolean, 
        required: true, 
        default: false,
    },
    tags:{
        type: [String], 
        required: true
    },
    meme_similare:{
        type: [{
          _id : String,
          image : String
           }],
           required:false
    },
    template:{
        type: String, 
        required: true, 
    },
    image:{
        type: String, 
        required: true, 
    },
    like:{
      type: Number,
      default: 0
    },
    dislike:{
      type: Number,
      default: 0
    },
    theme:{
        type: String, 
        required: true, 
    },
  }
);



//Exportation du modèle Auteur
module.exports = mongoose.model('Meme', MemeSchema);

