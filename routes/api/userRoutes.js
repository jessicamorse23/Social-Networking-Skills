// NU module 18.26 userRoutes.js

const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser, 
  updateUser,
  deleteUser,
  addFriend, 
  removeFriend,
} = require("../../controllers/userController");

// for testing api/users
router.route("/").get(getUsers).post(createUser);

// for testing api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// for testing api/users/:userId/friends/:friendId
router.route("/userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;