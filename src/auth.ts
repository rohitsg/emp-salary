import {passwordValidation, emailValidation, userValidation } from './db';
import {sign, verify} from 'jsonwebtoken';

export const generateAccessToken = async (user) => {
  const {email, password} = user;

  try {
      const isEmailValid = await emailValidation(email);
      if (!isEmailValid) {
        throw new Error('Invalid login details');
      }
      
      const isPasswordValid = await passwordValidation(password);
      if (!isPasswordValid) {
        throw new Error('Invalid login details');
      }
      const token = sign(user, process.env.TOKEN_SECRET as string, {
        expiresIn: "2 days"
      });

      return token;
  } catch (error) {
    throw error;
  }
}

export const authenticateToken = (req: Request, res, next) => {
  let authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');

  verify(token, process.env.TOKEN_SECRET as string, async (err, user) => {
    if (err) return res.status(403).send('Invalid user');
    const isValidUser = await userValidation(user);
    if (!isValidUser) {
      res.status(401).send('Invalid token');
      return;
    }
    // @ts-ignore
    req.user = user;
    next();
  })
}