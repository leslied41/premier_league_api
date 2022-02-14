const express = require("express");
const { v4: uuidv4 } = require("uuid");
const teamModel = require("../models/team");
const {
  getAllTeams,
  addNewTeam,
  getCertainTeams,
  deleteTeam,
  updateTeam,
} = require("../controllers/teams");
const { verifyToken } = require("../authrntication/jwt");
const router = express.Router();

router.get("/teams", verifyToken(["admin", "user"]), getAllTeams);
//router.get("/teams", getAllTeams);
router.get("/teams/query", verifyToken(["admin", "user"]), getCertainTeams);
router.post("/teams/add", verifyToken(["admin"]), addNewTeam);
router.delete("/teams/delete/:id", verifyToken(["admin"]), deleteTeam);
router.patch("/teams/update/:id", verifyToken(["admin"]), updateTeam);

// router.delete("/teams/:id", (req, res) => {
//   const { id } = req.params;
//   teams = teams.filter((team) => team._id != id);
//   res.send(`deleted `);
// });

router.get("/", verifyToken(["admin"]), (req, res) => {
  res.send("to verify role");
});

// router.patch("/teams/update/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, manager } = req.body;
//   const target_team = teams.find((team) => team.id === id);
//   if (name) {
//     target_team.name = name;
//   }
//   if (manager) {
//     target_team.manager = manager;
//   }

//   res.send(`Team with ${id} has been updated`);
// });

module.exports = router;
