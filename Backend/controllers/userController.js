import User from '../modules/user.js';
import hashPassword from '../utils/hashPassword.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function createUser(req, res) {
    const { first_name, last_name, username, email, password } = req.body;
  
    if (!username || !email || !password || !first_name || !last_name ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    try {
      const hashedPassword = await hashPassword(password);
  
      const newUser = new User({
        first_name,
        last_name,
        username,
        email,
        password: hashedPassword,
        });
  
      const savedUser = await newUser.save();
      // Remove password (to avoid sending password to the frontend)
      const { password: _, ...userWithoutPassword } = savedUser.toObject();
      res.status(201).json({
        message: 'User created successfully',
        user: userWithoutPassword,
      });
     } catch (err) {
    res.status(500).send({ message: 'Error creating user', error: err.message });
  }
}

export async function updateUser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (req.body.first_name) {
            user.first_name = req.body.first_name;
        }
        if (req.body.last_name) {
            user.last_name = req.body.last_name;
        }
        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = await hashPassword(req.body.password);
        }

        const updatedUser = await user.save();
        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getUser(req, res) {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (err) {
        console.error('Error getting user by id:', err);
        res.status(500).send('Error retrieving user');
    }
}

export async function login(req, res) {
    const { email, username, password } = req.body;

    if (!password || (!email && !username)) {
        return res.status(400).send({ message: 'Email or username and password are required' });
    }

    const query = email ? { email } : { username };

    try {
        const user = await User.findOne(query);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid password', auth: false, token: null });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).send({ auth: true, token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ message: 'Error on the server.', error: err.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send({ message: 'User successfully deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
}
