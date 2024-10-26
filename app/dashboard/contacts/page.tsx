'use client'; // Use this only if necessary, otherwise remove for SSR
import React, { useState } from 'react';
import { apiRequest } from '@/app/lib/utils';

const AddContact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !phone || !address) {
      setErrorMessage('All fields are required!');
      return;
    }

    try {
      const data = {
        name,
        phone,
        isEmergency: true, // Set as per requirements
        address,
      };

      const response = await apiRequest('post','/contacts/admin/add', data);

      
        setSuccessMessage('Contact added successfully');
        // Reset the form
        setName('');
        setPhone('');
        setAddress('');
     
    } catch (error) {
      setErrorMessage('An error occurred while adding the contact');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Contact</h1>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 text-green-500 text-sm text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter contact name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
          >
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
