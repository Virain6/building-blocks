import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const client = new ConvexHttpClient(process.env.CONVEX_URL);

export const isAdminMiddleware = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "Unauthorized. User not authenticated." });
  }

  try {
    const user = await client.query(api.users.getUserByUid, {
      uid: req.user.uid,
    });

    if (!user || !user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Forbidden. Admin access required." });
    }

    req.userData = user; // Attach user data to request
    next();
  } catch (error) {
    console.error("Error verifying admin:", error);
    res.status(500).json({ error: "Failed to verify admin status." });
  }
};
