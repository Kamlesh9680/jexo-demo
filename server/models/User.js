const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  inviteCode: { type: String },
  acceptPolicy: { type: Boolean, required: true },
  userId: { type: String, unique: true } 
});

// Pre-save hook to generate unique 7-digit userId
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    let userId;
    let userExists = true;

    // Generate a 7-digit userId and ensure it's unique
    while (userExists) {
      userId = Math.floor(1000000 + Math.random() * 9000000).toString(); // Generate a 7-digit number
      const existingUser = await mongoose.models.User.findOne({ userId });
      if (!existingUser) {
        userExists = false; // Break loop if no user with this userId exists
      }
    }

    this.userId = userId;
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
