import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {User} from '../entity/User';

import { AppDataSource } from '../data-source';


const JWT_SECRET = 'your_jwt_secret'; 

const userRepository = AppDataSource.getRepository(User); 

export namespace AuthController {
  
  export async function register(req :Request, res : Response) {
    try {
      const { username, password } = req.body;
      const existingUser = await userRepository.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      const password = await bcrypt.hash(password, 10);
  
      const newUser = await userRepository.create({ username, password  });
      const newUserData = await userRepository.save( newUser );
      res.status(201).json(newUserData);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  export async function login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userRepository.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  export async function logout(req, res) {
    try {
      // You may implement logout functionality if needed
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 