import axios from "./axiosConfig";

// Add a user to the Convex database
export const addUserToConvex = async (uid, email) => {
  try {
    const response = await axios.post("/users/register", {
      uid,
      email,
    });
    return response.data; // Return the response from the server
  } catch (error) {
    console.error("Error adding user to Convex:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

// Fetch all users (optional, for testing)
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data; // Return the list of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};
