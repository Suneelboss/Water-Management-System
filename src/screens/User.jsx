import React, { useState } from 'react';
import Menu from './components/Menu';

const User = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    deviceId: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can add further logic here, like sending data to an API
  };

  return (
    <div className="flex">
      <Menu />
      <div className="flex-1 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl mb-6 text-center">User Information</h1>

          {/* Name Field */}
          <div className="mb-5">
            <label className="block text-xl mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Username Field */}
          <div className="mb-5">
            <label className="block text-xl mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-xl mb-2">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-5">
            <label className="block text-xl mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Device ID Field */}
          <div className="mb-5">
            <label className="block text-xl mb-2">Device ID</label>
            <input
              type="text"
              name="deviceId"
              placeholder="Enter your Device ID"
              value={formData.deviceId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;