const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  FoodName: {
    type: String,
    require: true,
  },
  daySinceIAte: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
