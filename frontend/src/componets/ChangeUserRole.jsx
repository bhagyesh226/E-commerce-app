import React, { useState } from 'react';
import { toast } from 'react-toastify';


function ChangeUserRole({ user, onClose, onRoleUpdated }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_B_LIVE_URL}/api/update-role/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ role, email, name })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark"
        })
        onRoleUpdated(); // Refresh user list
        onClose(); // Close modal
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Update Info for {user.name}</h3>

        <input
          className="w-full border p-2 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <select
          className="w-full border p-2 mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="GENERAL">GENERAL</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-400 px-3 py-1 rounded text-white hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeUserRole;
