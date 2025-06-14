import React, { useEffect, useState } from 'react';
import summaryApi from '../../apiStore/api';
import { FaUserEdit } from "react-icons/fa";
import ChangeUserRole from '../componets/ChangeUserRole';

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // ✅

    const fetchUsers = async () => {
        try {
            const response = await fetch(summaryApi.allUsers.url, {
                method: summaryApi.allUsers.method,
                headers: summaryApi.allUsers.headers,
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                setUsers(data.data);
            } else {
                console.error('Failed to fetch users:', data.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">All Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                    <thead>
                        <tr className="bg-gray-200 text-left text-sm uppercase text-gray-600">
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Role</th>
                            <th className="py-3 px-6">Created At</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{user.name}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3 px-6">{user.role}</td>
                                <td className="py-3 px-6">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-6">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() => setSelectedUser(user)} // ✅
                                    >
                                        <FaUserEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Conditional popup or section */}
            {selectedUser && (
                <ChangeUserRole
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onRoleUpdated={fetchUsers}
                />
            )}
        </div>
    );
}

export default AllUsers;
