const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

// standard you can just change the :27017/food and add you route//
mongoose.connect(
  "mongodb://localhost:27017/food",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Connection error :" + err);
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const foodSave = new FoodModel({ FoodName: foodName, daySinceIAte: days }); // Save the data

  try {
    await foodSave.save();
    res.send("insert data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});
////////////// UPDTAE DATA ///////////////////
app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName; // La variable que tu veux changer
  const id = req.body.id; // Le id de l'identification
  // const food = await FoodModel.findById(id).exec(); // Test you id
  // console.log(food);
  // console.log(newFoodName, id);
  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.FoodName = newFoodName;
      updatedFood.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});
///////////////////////////: DETELE DATA ///////////////////
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
