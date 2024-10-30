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
  const [image, setImage] = useState<File | null>(null); // State for the image file

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
      const formData = new FormData();
      formData.append('name', name);
      formData.append('lastName', lastName);
      formData.append('middleInitial', middleInitial);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('email', email);
      formData.append('court', court);
      formData.append('locale', locale);
      formData.append('branch', branch);
      formData.append('isVisibleToAll', String(isVisibleToAll));
      formData.append('isEmergency', String(isEmergency));
      if (image) {
        console.log('image', image);
        formData.append('file', image); // Append the image file if selected
      }
      const requestOptions: RequestInit = {
        method: "POST",
        body: formData,
      };
  
      // await apiRequest('post', '/contacts/admin/add', formData);
      const response = await fetch("https://pja-admin-nest.9kwf3x.easypanel.host/contacts/admin/add", requestOptions);

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
      setImage(null);
    } catch (error) {
      setErrorMessage('An error occurred while adding the contact');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Update the image file state
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

          {/* Image Upload Field */}
          <div>
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

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
