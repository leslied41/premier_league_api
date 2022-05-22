const express = require("express");
const router = express.Router();
const igModel = require("../models/ig");

router.post("/add", async (req, res) => {
  const newIg = new igModel({
    start_time: req.body.start_time,
    access_key: req.body.access_key,
    id: new Date().getTime().toString(),
  });
  newIg
    .save()
    .then((data) => {
      //console.log(data);
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { id: id };
  const update = {
    start_time: req.body.start_time,
    access_key: req.body.access_key,
  };
  try {
    let doc = await igModel.findOneAndUpdate(filter, update);
    res.json("success update");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/get", async (req, res) => {
  const ig_obj = await igModel.find({});
  res.send({
    ig_obj,
  });
});

module.exports = router;
