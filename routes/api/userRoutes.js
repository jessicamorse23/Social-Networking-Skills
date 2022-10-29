// NU module 18.26 userRoutes.js

const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser, 
  uodateUser,
  deleteUser,
  addFriend, 
  removeFriend,
  updateUser,
} = require("../../controllers/userController");

// for testing api/users
router.route("/").get(getUsers).post(createUser);

// for testing api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;