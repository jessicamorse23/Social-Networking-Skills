// Thought
// thoughtText

// String
// Required
// Must be between 1 and 280 characters
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// username (The user that created this thought)

// String
// Required
// reactions (These are like replies)

// Array of nested documents created with the reactionSchema
// Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
// Use module 18.25 video schema for reference

const { triggerAsyncId } = require("async_hooks");
const { Timestamp } = require("bson");
const { timeStamp } = require("console");
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/helpers");
const { setFlagsFromString } = require("v8");
const reaction = require("./reaction");


const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String, 
      required: "Thought or reaction is required",
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },

    username: {
      type: String, 
      required: true,
    },

    reactions: [ReactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true, 
    },
    id: false, 
  }
);

  // Getter function 
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;