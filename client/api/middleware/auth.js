const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;


const authCheck = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  console.log("header", authHeader);

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, decode) => {
      if (err) {
        return res.status(403).json({ status: 403, message: "You don't have permission to access." });
      }
      req.decode = decode
      next();
    });

  } else {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
};

module.exports = authCheck