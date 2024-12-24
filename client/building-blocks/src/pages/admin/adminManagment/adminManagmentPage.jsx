import React, { useEffect, useState } from "react";
import { fetchUsers, updateAdminStatus } from "../../../utils/userApi";

const AdminManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const userList = await fetchUsers(); // Fetch all users
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const toggleAdmin = async (uid, currentStatus) => {
    try {
      await updateAdminStatus(uid, !currentStatus); // Toggle admin status
      setUsers((prev) =>
        prev.map((user) =>
          user.uid === uid ? { ...user, isAdmin: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating admin status:", error);
      alert("Failed to update admin status.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Management</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Admin</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid} className="border-b">
                <td className="px-4 py-2">{user.name || "N/A"}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => toggleAdmin(user.uid, user.isAdmin)}
                    className={`px-4 py-2 rounded-md ${
                      user.isAdmin
                        ? "bg-red-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {user.isAdmin ? "Revoke Admin" : "Grant Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminManagement;
