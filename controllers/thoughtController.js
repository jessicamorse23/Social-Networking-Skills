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
  })
  
}
}
