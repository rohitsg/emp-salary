import {sign, verify} from 'jsonwebtoken';


export const generateAccessToken = (user) => {
  const token = sign(user, process.env.TOKEN_SECRET as string, {
    expiresIn: "2 days"
  });

  return token;
}

export const authenticateToken = (req: Request, res, next) => {
  let authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');

  verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
    if (err) return res.status(403).send('Invalid user');
    // @ts-ignore
    req.user = user
    next();
  })
}