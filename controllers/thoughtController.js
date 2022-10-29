const { createDecipheriv } = require("crypto");
const { Thought, User } = require("../models");

const thoughtController = {
getThoughts(req, res) {
  Thought.find({})
  .populate({
    path: "reactions",
    select: "-__v",
  })
  select("-__v")
  .sort({ _id: -1 })
  .then((dbThoughtData) => res.json(dbThoughtData))
  .catch((err) =>{
    console.log(err);
    res.sendStatus(400);
  });
},
getOneThought({ params }, res) {
  Thought.findOne({_id: params.id })
  .populate({
    path: "reactions",
    select: "-__v",
  })
  .select("-__v")
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
userCreateThought({ params, body}, res) {
  Thought.create(body)
  .then(({_id}) => {
    return User.findOneAndUpdate(
      { _id: body.userId },
      { $push: { thoughts: _id} },
      {new: true} 
    );
  })
  .then((dbUserData) => {
    return res.status(404).json({message: "thought 💭 created - user not found 🤔"})
  })
  .catch((err) => res.json(err));
},
updateOneThought({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.id}, body, {
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

deleteThought({ params }, res) {
  Thought.findOneAndDelete({ _id: params.id})
  .then((dbThoughtData) => {
    if (!dbThoughtData) {
      return res.status(404).json({ message: "thought 💭 not found"});
    }
    return User.findByIdAndUpdate(
      {thoughts: params.id}, 
      { $pull: {thoughts: params.id}}, 
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

addOneReaction({ params, body}, res) {
  Thought.findOneAndUpdate(
    {_id: params.thoughtId},
    {$addToSet: {reactions: body}},
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
deleteOneReaction({ params }, res) {
Thought.findOneAndUpdate(
  {_id: params.thoughtId},
  {$pull: {reactions: {reactionId: params.reactionId}}},
  {new: true}
).then((dbThoughtData) => res.json(dbThoughtData))
.catch((err) => res.json(err));
},
};

module.exports = thoughtController;
