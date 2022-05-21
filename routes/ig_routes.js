const express = require("express");
const router = express.Router();
const igModel = require("../models/ig");

router.post("add/", async (req, res) => {
  const newIg = new igModel({
    start_time: req.body.start_time,
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

router.post("update/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { id: id };
  const update = {
    start_time: req.body.start_time,
  };
  try {
    let doc = await igModel.findOneAndUpdate(filter, update);
    res.json("success update");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
