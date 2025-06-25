const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // first check the token in the request headers
  const token = req.headers.authorization;

  // If no token is sent
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    // Remove 'Bearer ' from token if it's there
    // bearer :"Bearer eyJhbGciOiJIUzI1Ni...".
    const finalToken = token.replace("Bearer ", "");

    // Verify the token with your secret key
    const decoded = jwt.verify(finalToken, process.env.JWT_SECRET || "jpsingh");

    // Add user ID to request
    req.userId = decoded.id;

    // Move to the next function (controller)
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
