const { User, Thought } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find({})
    // https://mongoosejs.com/docs/populate.html
    .populate({
path: "friends",
select: "-__v"
// https://www.bezkoder.com/mongoose-one-to-many-relationship/
// https://gist.github.com/tmurphree/1a6a8f575b7309c478fac406f0e893b2
    })
  .select ("-__v")
  .sort ({_id: -1})
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => {
    console.log(err);
    res.sendStatus(400);
  });
},
getSingleUser({ params }, res) {
  User.findOne({ _id: params.id })
  .populate({
    path: "thoughts",
    select: "-__v",
  })
  .populate({
    path: "friends",
    select: "-__v",
  })
  .select("-__v")
  .then((dbUserData) => {
    if (!dbUserData) {
      return res 
      .status(404)
      .json({message: "User not found" });
    }
    res.json(dbUserData);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(400);
  });
},
// NU Module 18.25 UserController.js
createUser(req, res) {
  User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
},

updateUser({ params, body }, res) {
User.findOneAndUpdate({ _id: params.id }, body, {
new: true,
runValidators: true,
})
.then((dbUserData) => {
  if (!dbUserData) {
    res.status(404).json({ message: "User not found"});
    return;
  }
  res.json(dbUserData);
})
.catch((err) => res.json(err));
},
// deleteUser({ params }, res) {
//   User.findOneAndDelete({_id: params.id})
//   .then ((dbUserData) => {
//     if (!dbUserData) {
//       return res.status(404).json({ message: "user not found"});
//     }
//   }).then (() => {
//     res.json({message: "user deleted"});
//   })
//   .catch((err) => res.json)
//   }
// },

deleteUser({ params }, res) {
  User.findOneAndDelete({ _id: params.id})
  .then((dbUserData) => {
if (!dbUserData) {
  return res.status(404).json({message: "user not found"});
}
 // BONUS: Remove a user's associated thoughts when deleted.  Module 18.26 UserController.js $in
 return Thought.deleteMany({_id: { $in: dbUserData.thoughts} });
  
  }).then(() => {
    res.json({message: "user and associated thoughts have been deleted"});
  })
  .catch((err) => res.json(err));
 
},

addFriend({ params }, res ) {
  User.findOneAndUpdate(
    {_id: params.userId },
    { $addToSet: {friends: params.FriendId }},
    {new: true, runValidators: true}
  ).then((dbUserData) => {
if (!dbUserData) {
  res.status(404).json({message: "user not found - can't add friend"});
  return;
}
res.json(dbUserData);
  })
  .catch((err) => res.json(err));
},

removeFriend({ params }, res) {
  User.findOneAndUpdate(
    { _id: params.userId}, 
    {$pull: {friends: params.friendId} }, 
    {new: true}
  ).then((dbUserData) => {
    if (!dbUserData) {
      return res.status(404).json({message: "user not found - can't remove friend"});
    }
    res.json(dbUserData);
  })
  .catch((err) => res.json(err));
},
};

module.exports = userController




