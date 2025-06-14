import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
    FaBell,
    FaMapMarkerAlt,
    FaMoon,
    FaEyeSlash,
    FaGlobe,
    FaEnvelope,
    FaUserShield
} from 'react-icons/fa';
import summaryApi from '../../apiStore/api';
import { setUserData } from '../store/userSlice';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import { useDispatch } from 'react-redux';
import { FiLogIn } from "react-icons/fi";

function Settings() {
    const [settings, setSettings] = useState({
        notifications: true,
        location: false,
        darkMode: false,
        privacyMode: false,
        emailUpdates: true,
        visibility: 'public',
        language: 'English',
    });

    const toggleSetting = (key) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ✅ Initialize navigate

    const handleSelectChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };
    const handleLogout = async () => {
        const res = await fetch(summaryApi.user_Louout.url, {
            method: summaryApi.user_Louout.method,
            credentials: 'include',
        });

        const data = await res.json();

        if (data.success) {
            toast.success(data.message, {
                position: "top-right",
                autoClose: 2000,
                theme: "dark"
            });
            dispatch(setUserData(null));
            setTimeout(() => navigate('/login'), 2000);
        } else {
            toast.error(data.message || "Logout failed", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark"
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Notifications */}
                <SettingToggle
                    icon={<FaBell className="text-blue-500" />}
                    title="Notifications"
                    description="Receive order and update alerts"
                    checked={settings.notifications}
                    onChange={() => toggleSetting('notifications')}
                />

                {/* Location */}
                <SettingToggle
                    icon={<FaMapMarkerAlt className="text-red-500" />}
                    title="Location Access"
                    description="Allow access to your device location"
                    checked={settings.location}
                    onChange={() => toggleSetting('location')}
                />

                {/* Dark Mode */}
                <SettingToggle
                    icon={<FaMoon className="text-purple-500" />}
                    title="Dark Mode"
                    description="Switch to a darker theme"
                    checked={settings.darkMode}
                    onChange={() => toggleSetting('darkMode')}
                />

                {/* Privacy Mode */}
                <SettingToggle
                    icon={<FaEyeSlash className="text-gray-600" />}
                    title="Privacy Mode"
                    description="Hide activity and email from other users"
                    checked={settings.privacyMode}
                    onChange={() => toggleSetting('privacyMode')}
                />

                {/* Email Updates */}
                <SettingToggle
                    icon={<FaEnvelope className="text-orange-500" />}
                    title="Email Updates"
                    description="Receive promotional and update emails"
                    checked={settings.emailUpdates}
                    onChange={() => toggleSetting('emailUpdates')}
                />

                {/* Language Select */}
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-2">
                        <FaGlobe className="text-green-600" />
                        <h3 className="font-semibold text-gray-800">Language</h3>
                    </div>
                    <select
                        value={settings.language}
                        onChange={(e) => handleSelectChange('language', e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Gujarati</option>
                        <option>Spanish</option>
                    </select>
                </div>

                {/* Account Visibility */}
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-2">
                        <FaUserShield className="text-indigo-500" />
                        <h3 className="font-semibold text-gray-800">Account Visibility</h3>
                    </div>
                    <select
                        value={settings.visibility}
                        onChange={(e) => handleSelectChange('visibility', e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                    className="px-6 py-2 cursor-pointer bg-green-400 hover:bg-green-700 text-white rounded-lg shadow"
                    
                >
                    Save Changes
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer px-5 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                    <FiLogIn className="text-lg" />
                    Logout
                </button>
            </div>
        </div>
    );
}

function SettingToggle({ icon, title, description, checked, onChange }) {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
                <div className="text-xl">{icon}</div>
                <div>
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-checked:bg-green-500 rounded-full transition-colors">
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5" />
                </div>
            </label>
        </div>
    );
}

export default Settings;
