const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const secretKey = 'mayurirajput';
const Users = require('../models/userModel.js'); // Adjust the path according to your project structure

// Signup controller
// exports.register = async (req, res) => {
//    const { name, email, password } = req.body;
 
//   try {
//     // Check if the user already exists
//     const existingUser = await Users.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await Users.create({ name, email, password: hashedPassword });

//     res.status(201).json({ message: 'User created successfully'});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const adminId = req.user.id; // Get the admin ID from the JWT token

  try {
      // Check if the user already exists
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
          return res.status(400).json({ error: 'User with this email already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user with createdBy set to the admin ID
      const newUser = await Users.create({
          name,
          email,
          password: hashedPassword,
          createdBy: adminId, // Set createdBy to the ID of the admin who created this user
      });

      res.status(201).json({
          message: 'User created successfully',
          user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              createdBy: newUser.createdBy,
          },
      });
  } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};




// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await Users.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Generate token
//         const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' }); // Use a secret stored in .env

//         res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       const user = await Users.findOne({ where: { email } });
//       if (!user) {
//           return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       const isValidPassword = await bcrypt.compare(password, user.password);
//       if (!isValidPassword) {
//           return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       // Optionally check if the user was created by a specific admin
//       const adminId = req.user.id; // Get the ID of the logged-in admin
//       console.log(adminId);
//       if (user.createdBy !== adminId) {
//           return res.status(403).json({ message: 'You are not authorized to log in this user.' });
//       }

//       const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
//       res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//       console.error('Error logging in user:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// };
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
