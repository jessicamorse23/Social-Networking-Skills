// reference NU module 18 mini project solved student routes

const router = require("express").Router();
const {
  getThoughts, 
  getOneThought,
  userCreateThought,
  updateOneThought,
  deleteThought,
  addOneReaction,
  deleteOneReaction,

} = require("../../controllers/thoughtController");

// for testing = api/thoughts
router.route("/").get(getThoughts).post(userCreateThought);

// for testing = api/thoughts/:id
router
.route("/id")
.get(getOneThought)
.put(updateOneThought)
.delete(deleteThought)

// for testing api/thoughts/:thoughtId/reactions
router.route("/thoughtId/reactions").post(addOneReaction);

//  for testing api/thoughts:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/reactionId").delete(deleteOneReaction);

module.exports = router;



