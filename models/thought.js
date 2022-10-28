// Thought

const { triggerAsyncId } = require("async_hooks");
const { Timestamp } = require("bson");
const { timeStamp } = require("console");
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/helpers");
const { setFlagsFromString } = require("v8");

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

const ReactionSchema = newSchema(
{
  reactionId: {
    // This datatype is used to store the document’s ID.
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId,
    // ObjectID is the primary key for the stored document and is automatically generated when creating a new document in a collection -
    // https://orangematter.solarwinds.com/2019/12/22/what-is-mongodbs-id-field-and-how-to-use-it/#:~:text=Architecturally%2C%20by%20default%20the%20_id,new%20document%20in%20a%20collection.
  },

  reactionBody: {
    type: String, 
    required: true,
    maxlength: 280, 
  },

  username: {
    type: String, 
    required: true,
  },

  createdAt: {
    type: Date, 
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
);

const ThoughtSchema = newSchema(
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

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;