const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/helpers");
const { setFlagsFromString } = require("v8");



const reactionSchema = new Schema(
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

module.exports = reactionSchema;