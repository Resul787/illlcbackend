/*const jwt = require('jsonwebtoken');

function authMiddleware(req,res,next){
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'Unauthorized' });
  try{
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  }catch(e){
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function adminOnly(req,res,next){
  if(!req.user) return res.status(401).json({ message:'Unauthorized' });
  if(!req.user.roles || !req.user.roles.includes('admin')) return res.status(403).json({ message:'Forbidden' });
  next();
}

module.exports = { authMiddleware, adminOnly };
*/