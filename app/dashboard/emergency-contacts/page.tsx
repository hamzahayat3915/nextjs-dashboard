'use client'; // Use this if you need client-side functionality, otherwise remove for SSR 
import React, { useState } from 'react';
import { apiRequest } from '@/app/lib/utils';

const UploadContacts: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile, 'ss');
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSuccess(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError(null);
      setSuccess(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
  
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    const formData = new FormData();
    formData.append('file', file); // Ensure this matches what your backend expects
  
    const requestOptions: any = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };
  
    try {
      const response = await fetch("http://localhost:3000/contacts/upload", requestOptions);
  
      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.text(); // Handle the response as text
      console.log(result); // Handle response data as needed
      setSuccess('File uploaded successfully!');
    } catch (err: any) {
      setError('File upload failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Upload Contacts
        </h2>

        <div
          className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center transition bg-gray-50 hover:bg-gray-100"
         
        >
          <p className="text-gray-600">
            Drag & drop an Excel file here, or click to select one
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Only .xls and .xlsx files are accepted
          </p>
          <input
            type="file"
            // accept=".xls, .xlsx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="text-blue-500 underline">Click to select a file</span>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default UploadContacts;
