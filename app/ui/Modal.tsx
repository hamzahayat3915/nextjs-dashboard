import React, { useState } from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  onConfirm?: () => void;
  initialData?: {
    name: string;
    phone: string;
    isEmergency: boolean;
    isVisibleToAll: boolean;
    address: string;
  };
  message?: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, onSubmit, onConfirm, initialData, message }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    phone: '',
    isEmergency: false,
    isVisibleToAll: false,
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md mx-4 transition-transform transform scale-100 hover:scale-105">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">{title}</h2>
        {message ? (
          <p className="mb-4 text-gray-600 text-center">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6"> {/* Changed to space-y-6 for more space */}
            <div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Address"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            {/* <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={formData.isEmergency}
                onChange={(e) => setFormData({ ...formData, isEmergency: e.target.checked })}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm">Emergency Contact</label>
            </div> */}
            {/* <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={formData.isVisibleToAll}
                onChange={(e) => setFormData({ ...formData, isVisibleToAll: e.target.checked })}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm">Visible to All</label>
            </div> */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white rounded-md px-4 py-3 hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              Save
            </button>
          </form>
        )}
        <div className="mt-6 flex justify-between">
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-800 transition duration-200"
          >
            Cancel
          </button>
          {onConfirm && (
            <button 
              onClick={onConfirm} 
              className="text-red-600 hover:text-red-800 transition duration-200"
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
