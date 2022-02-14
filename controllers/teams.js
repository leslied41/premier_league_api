const teamModel = require("../models/team");

const getAllTeams = async (req, res) => {
  console.log("get all temas");
  const teams = await teamModel.find({}).sort("teamValue");
  // .select("teamValue name venue founded manager")
  // .limit(2)
  // .skip(1);
  //by using sort, the results can be sorted based on certain property
  res.send({
    teams,
    num_of_teams: teams.length,
  });
};

const getCertainTeams = async (req, res) => {
  //the reason why descture req.query is because it that if a unexisting
  //query property is passed to the query then the query result will be empty.
  //which is not good. By the beside methon, if a unexisting query ppropety is used to
  //query, then this property can be ignored.
  const { id, name, manager, venue, founded, sort, teamValue, fields } =
    req.query;
  const queryObject = {};
  if (id) {
    queryObject.id = id;
  }
  if (teamValue) {
    queryObject.teamValue = teamValue;
  }
  if (name) {
    queryObject.name = name;
  }
  if (venue) {
    queryObject.venue = venue;
  }
  if (founded) {
    queryObject.founded = founded;
  }
  if (manager) {
    queryObject.manager = manager;
  }
  //sort
  let result = teamModel.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join("");
    //this is because sort may contain two parameters and seperated by colon
    //therefore, we need to remove this colon due to the sytax of sort.
    result = result.sort(sortList);
  }
  //select certain fields to show
  if (fields) {
    const fieldsList = fields.split(",").join("");
    result = result.select(fieldsList);
  }

  const teams = await result;
  res.send(teams);
};

const deleteTeam = (req, res) => {
  const id = req.params.id;
  teamModel
    .deleteOne({ id: id })
    .then(function (data) {
      console.log("Data deleted"); // Success
      res.json(data);
    })
    .catch(function (error) {
      console.log(error); // Failure
      res.json(error);
    });
};

const addNewTeam = (req, res) => {
  const newTeam = new teamModel({
    name: req.body.name,
    manager: req.body.manager,
    teamValue: req.body.teamValue,
    founded: req.body.founded,
    venue: req.body.venue,
    id: new Date().getTime().toString(),
  });
  newTeam
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};

const updateTeam = async (req, res) => {
  const id = req.params.id;
  const filter = { id: id };
  const update = {
    name: req.body.name,
    founded: req.body.founded,
    venue: req.body.venue,
    teamValue: req.body.teamValue,
    manager: req.body.manager,
  };
  try {
    let doc = await teamModel.findOneAndUpdate(filter, update);
    res.json("success update");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = {
  getAllTeams,
  addNewTeam,
  getCertainTeams,
  deleteTeam,
  updateTeam,
};
