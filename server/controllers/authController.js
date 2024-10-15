const mongoose = require('mongoose');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserPayments = require('../models/UserPayments');
const UserDailyInfo = require('../models/userDailyInfo');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
};

const sendVerificationCode = async (req, res) => {
  const { email } = req.body; // Get the user's email from the frontend

  try {
    const user = await User.findOne({ email });
    if (user) {
      // Return a specific error message if the user exists
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Generate a random verification code
    const verificationCode = generateVerificationCode();

    // Ensure session exists
    if (!req.session) {
      return res.status(500).json({ msg: 'Session error' });
    }

    req.session.verificationCode = verificationCode;


    // Send the verification code via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error sending email' });
      } else {
        return res.status(200).json({
          msg: 'Verification code sent',
          verificationCode: verificationCode,
        });
      }
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword, mobile, invitedFrom, acceptPolicy } = req.body;

  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    user = new User({
      username,
      email,
      password: hashedPassword,
      mobile,
      invitedFrom,
      acceptPolicy,
    });

    // Save user to the User model
    await user.save({ session });

    // Create a record in the UserPayment model
    const userPayment = new UserPayments({
      userId: user.userId, // Link to the new user
      email,
      memberpoint: 0,
      ratingIncome: 0,
      teamIncome: 0,
      totalteamMembers: 0,
      teamMemberData: {},
      vipLevel: 'none', // Default VIP level
      price: 0, // Default initial value
      transactionId: '', // Can be updated when payment occurs
      status: 'pending', // Default status
      paymentMethod: '', // Will be set during payment
    });

    await userPayment.save({ session });

    // Create a record in the UserDailyInfo model
    const userDailyInfo = new UserDailyInfo({
      userId: user.userId, // Link to the new user
      email, // Use the user's email
      rateCount: 0, // Default values
    });

    await userDailyInfo.save({ session });

    // Referral logic: If invitedFrom exists, update inviter’s info
    if (invitedFrom) {
      const inviter = await User.findOne({ inviteCode: invitedFrom });
      console.log("t func enter");

      if (inviter) {
        const inviterPayment = await UserPayments.findOne({ userId: inviter.userId });

        if (inviterPayment) {
          // Increment total team members for the inviter
          inviterPayment.totalteamMembers += 1;
          console.log("t func team 1 done");

          // Add the new user's details to teamMemberData
          inviterPayment.teamMemberData.set(user.userId, {
            userId: user.userId,
            registrationDate: new Date(),
          });

          // Save the updated inviter's payment info
          await inviterPayment.save({ session });
          console.log("t func team save");

        }
      }
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Create and return JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    // Rollback in case of error
    await session.abortTransaction();
    session.endSession();

    console.error(error.message);
    res.status(500).send('Server error');
  }
};


const loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Find user's membership or payment details (Adjust according to your schema)
    const membership = await UserPayments.findOne({ userId: user.userId });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user, membership info, and token
    res.json({
      token,
      user: {
        id: user.userId,
        username: user.username,
        email: user.email,
        inviteCode: user.inviteCode
      },
      membership: membership ? membership.vipLevel : null // Return membership if found, or null if not
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('Server error');
  }
};


module.exports = { registerUser, loginUser, sendVerificationCode };
