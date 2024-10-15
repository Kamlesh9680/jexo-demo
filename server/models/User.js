const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true},
  userId: { type: String, unique: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  inviteCode: { type: String, unique: true },
  invitedFrom: { type: String },
  acceptPolicy: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Helper function to generate a 6-character alphanumeric invite code
const generateInviteCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let inviteCode = '';
  for (let i = 0; i < 6; i++) {
    inviteCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return inviteCode;
};

// Pre-save hook to generate unique userId and inviteCode
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    // Generate unique userId
    let userId;
    let userExists = true;
    while (userExists) {
      userId = Math.floor(1000000 + Math.random() * 9000000).toString(); // Generate 7-digit number
      const existingUser = await mongoose.models.User.findOne({ userId });
      if (!existingUser) {
        userExists = false; // Break loop if no user with this userId exists
      }
    }
    this.userId = userId;

    // Generate unique inviteCode
    let inviteCodeExists = true;
    while (inviteCodeExists) {
      const inviteCode = generateInviteCode();
      const existingCode = await mongoose.models.User.findOne({ inviteCode });
      if (!existingCode) {
        this.inviteCode = inviteCode; // Assign the unique inviteCode
        inviteCodeExists = false;
      }
    }
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
