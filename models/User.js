// User

const { Schema } = require("mongoose");

// username

// String
// Unique
// Required
// Trimmed
// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)
// Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const UserSchema = new Schema(
  {
    username: {
      type: String, 
      unique: true, 
      trim: true, 
      required: "Must enter username to proceed."
    },
    email: {
      type: String, 
      required: "A valid email address is required to proceed.", 
      match: [/.+\@.+\..+/],
      unique: true, 
      // https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// getter function
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
}); 

const User = model("User", UserSchema);

module.exports = User;