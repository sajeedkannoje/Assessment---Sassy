import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret'; // Replace with your actual JWT secret

export namespace AuthMiddleware {
  export function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}


