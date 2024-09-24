// controllers/adminController.js
const Admin = require('../models/adminModel.js');
const Users = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const secretKey = 'mayurirajput';
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: admin.id }, secretKey, { expiresIn: '1h' }); // Use a secret stored in .env
    // Here you can set session or JWT token
    res.status(200).json({ message: 'Login successful',token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const adminId=req.user.id;

  try {
      // Check if the user already exists
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
          return res.status(400).json({ error: 'User with this email already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await Users.create({
          name,
          email,
          password: hashedPassword,
          createdBy: adminId,
      });

      // Return the created user details (omit password)
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
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
//update user

// adminController.js
exports.updateUser = async (req, res) => {
  const { id } = req.params; // User ID from the URL
  const adminId = req.user.id; // Get the ID of the logged-in admin

  try {
      const user = await Users.findOne({ where: { id, createdBy: adminId } });
      if (!user) {
          return res.status(404).json({ error: 'User not found or not created by this admin.' });
      }

      // Update user details
      const { name, email, password } = req.body;
      if (password) {
          user.password = await bcrypt.hash(password, 10); // Hash new password if provided
      }
      user.name = name || user.name;
      user.email = email || user.email;

      await user.save(); // Save the updated user

      res.status(200).json({
          message: 'User updated successfully.',
          user: {
              id: user.id,
              name: user.name,
              email: user.email,
              createdBy: user.createdBy,
          },
      });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

//delete user
// adminController.js
exports.deleteUser = async (req, res) => {
  const { id } = req.params; // User ID from the URL
  const adminId = req.user.id; // Get the ID of the logged-in admin

  try {
      const user = await Users.findOne({ where: { id, createdBy: adminId } });
      if (!user) {
          return res.status(404).json({ error: 'User not found or not created by this admin.' });
      }

      await user.destroy(); // Delete the user
      res.status(204).send(); // No content
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


exports.fetchAllUsers = async (req, res) => {
  const adminId = req.user.id; // Get the ID of the logged-in admin

  try {
      const users = await Users.findAll({
          where: { createdBy: adminId },
          attributes: { exclude: ['password'] }, // Exclude password from response
      });
      
      if (users.length === 0) {
          return res.status(404).json({ error: 'No users found for this admin.' });
      }
      
      res.status(200).json(users);
  } catch (error) {
      console.error('Error fetching users by admin ID:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

