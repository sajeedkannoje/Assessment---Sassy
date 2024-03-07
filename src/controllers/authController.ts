import jwt from 'jsonwebtoken';
import e, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../entity/user.entity';

import { AppDataSource } from '../data-source';


const JWT_SECRET = 'jwt_secret';

const userRepository = AppDataSource.getRepository(User);

export namespace AuthController {

  export async function register(req: Request, res: Response) {
    try {
      const { email, username, password: plainPassword } = req.body;

     // Check if the email already exists
     const existingEmailUser = await userRepository.findOneBy({ email });
     console.log(existingEmailUser)
     if (existingEmailUser) {
         return res.status(400).json({ message: 'Email address already exists' });
     }
     // Check if the username already exists
     const existingUser = await userRepository.findOneBy({ username });
     if (existingUser) {
         return res.status(400).json({ message: 'Username already exists' });
     }
      const password = await bcrypt.hash(plainPassword, 10);

      const newUser = await userRepository.create({ username, password, email });
      const newUserData = await userRepository.save(newUser);

      res.status(201).json(newUserData);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  export async function login(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await userRepository.findOneOrFail( { where: { username, email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      res.json({ 
        user, 
        "authorization" : { token } 
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  export async function logout(req, res) {
    try {
      //  implement logout functionality if needed
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 