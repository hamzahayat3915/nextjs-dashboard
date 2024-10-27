'use client';
import React, { useState } from 'react';
import { apiRequest } from '@/app/lib/utils';

const AddContact: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [court, setCourt] = useState('');
  const [locale, setLocale] = useState('');
  const [branch, setBranch] = useState('');
  const [isVisibleToAll, setIsVisibleToAll] = useState(true);
  const [isEmergency, setIsEmergency] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !phone || !address) {
      setErrorMessage('Name, phone, and address are required!');
      return;
    }

    try {
      const data = {
        name,
        lastName,
        middleInitial,
        phone,
        address,
        email,
        court,
        locale,
        branch,
        isVisibleToAll,
        isEmergency,
      };

      await apiRequest('post', '/contacts/admin/add', data);

      setSuccessMessage('Contact added successfully');
      setName('');
      setLastName('');
      setMiddleInitial('');
      setPhone('');
      setAddress('');
      setEmail('');
      setCourt('');
      setLocale('');
      setBranch('');
      setIsVisibleToAll(true);
      setIsEmergency(false);
    } catch (error) {
      setErrorMessage('An error occurred while adding the contact');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Contact</h1>

        {errorMessage && <div className="mb-4 text-red-500 text-sm text-center">{errorMessage}</div>}
        {successMessage && <div className="mb-4 text-green-500 text-sm text-center">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Fields */}
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Middle Initial</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Middle Initial"
                value={middleInitial}
                onChange={(e) => setMiddleInitial(e.target.value)}
              />
            </div>

            {/* Contact Fields */}
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Court Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-gray-700">Court</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Court"
                value={court}
                onChange={(e) => setCourt(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Locale</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Locale"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Branch</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>
          </div>

          {/* Checkbox Fields */}
        

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition mt-6"
          >
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
