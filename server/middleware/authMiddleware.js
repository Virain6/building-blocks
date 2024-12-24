import admin from "../firebase/firebaseAdmin.js";

export const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Token missing." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token); // Verify token
    req.user = decodedToken; // Attach user data to request object
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};
