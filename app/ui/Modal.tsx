import React, { useState } from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  onConfirm?: () => void;
  initialData?: {
    name: string;
    lastName: string;
    middleInitial: string;
    phone: string;
    address: string;
    email: string;
    court: string;
    locale: string;
    branch: string;
    isVisibleToAll: boolean;
    isEmergency: boolean;
  };
  message?: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, onSubmit, onConfirm, initialData, message }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    lastName: '',
    middleInitial: '',
    phone: '',
    address: '',
    email: '',
    court: '',
    locale: '',
    branch: '',
    isVisibleToAll: false,
    isEmergency: false,
    file: null,
  });
  const [image, setImage] = useState<File | null>(null); // State for the image file

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' && files ? files[0] : value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Update the image file state
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{title}</h2>
        
        {message ? (
          <p className="mb-4 text-gray-600 text-center">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Contact Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Middle Initial</label>
                <input
                  type="text"
                  name="middleInitial"
                  value={formData.middleInitial}
                  onChange={handleChange}
                  placeholder="Middle Initial"
                  className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Court Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Court</label>
                <input
                  type="text"
                  name="court"
                  value={formData.court}
                  onChange={handleChange}
                  placeholder="Court"
                  className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Locale</label>
                <input
                  type="text"
                  name="locale"
                  value={formData.locale}
                  onChange={handleChange}
                  placeholder="Locale"
                  className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Branch"
                  className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
                 {/* Image Upload Field */}
          <div>
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="file"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
            </div>

                

            {/* Save Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 transition shadow-md"
            >
              Save
            </button>
          </form>
        )}

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-between">
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-800 transition"
          >
            Cancel
          </button>
          {onConfirm && (
            <button 
              onClick={onConfirm} 
              className="text-red-600 hover:text-red-800 transition"
            >
              Confirm Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
