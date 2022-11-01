const { createDecipheriv } = require("crypto");
const { Thought, User } = require("../models");

const thoughtController = {
getThoughts(req, res) {
  Thought.find()
  .then((thoughts) => res.json(thoughts))
  .catch((err) => res.status(404).json(err));
},

getOneThought(req, res) {
  Thought.findOne({_id: req.params.thoughtId })
.then((dbThoughtData) => {
    if (!dbThoughtData) {
      return res.status(404).json({message: "thought 💭 not found"});
    }
    res.json(dbThoughtData);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(400);
  });
},

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// thoughts get posted to the body by the user
userCreateThought(req, res) {
  Thought.create(req.body)
  .then((dbUserData) => {
    return User.findOneAndUpdate(
      { _id: body.userId },
      { $addToSet: { thoughts: Thought._id} },
      {new: true} 
    );
  })
  .then((dbUserData) => {
    return res.status(404).json({message: "thought 💭 created - user not found 🤔"})
  })
  .catch((err) => res.json(err));
},
updateOneThought(req, res) {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId}, {$set: req.body}, {
    new: true, 
    runValidators: true,
  }).then((dbThoughtData) => {
    if (!dbThoughtData) {
      res.status(404).json({message: "thought 💭 not found"});
      return;
    }
    res.json(dbThoughtData);
  })
  .catch((err) => res.json(err));
},

deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId})
  .then((dbThoughtData) => {
    if (!dbThoughtData) {
      return res.status(404).json({ message: "thought 💭 not found"});
    }
    return User.findOneAndUpdate(
      {thoughts: req.params.thoughtId}, 
      { $pull: {thoughts: req.params.thoughtId}}, 
      {new: true}
    );
  }).then((dbUserData) => {
    if (!dbUserData) {
      return res.status(404).json({message: "thought 💭 created - user not found 🤔"})
    }
    res.json({message: "thought deleted 💨"});
  })
  .catch((err) => res.json(err));
},
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value

addOneReaction(req, res) {
  Thought.findOneAndUpdate(
    {_id: req.params.thoughtId},
    {$addToSet: {reactions: req.body}},
    {new: true, runValidators: true}
  ).then((dbThoughtData) => {
    if (!dbThoughtData) {
      res.status(404).json({ message: "thought 💭 not found"});
      return;
    }
    res.json(dbThoughtData);
  })
  .catch((err) => res.json(err));
},
deleteOneReaction(req, res) {
Thought.findOneAndUpdate(
  {_id: req.params.thoughtId},
  {$pull: {reactions: {reactionId: req.params.reactionId}}},
  {new: true}
).then((dbThoughtData) => res.json(dbThoughtData))
.catch((err) => res.json(err));
},
};

module.exports = thoughtController;
