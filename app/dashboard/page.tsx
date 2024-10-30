'use client';
import React, { useState, useEffect } from 'react';
import { apiRequest } from '../lib/utils';
import Modal from '../ui/Modal';

interface Contact {
  id: number;
  name: string;
  phone: string;
  isEmergency: boolean;
  isVisibleToAll: boolean;
  address: string;
  lastName: string;
  middleInitial: string;
  email: string;
  court: string;
  locale: string;
  branch: string;
  imagePath: string;
  file: File | null;
}

const Dashboard: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [refreshContacts, setRefreshContacts] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const data = await apiRequest('GET', '/contacts/public');
        setContacts(data);
      } catch (error) {
        setError('Failed to fetch contacts');
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [refreshContacts]); // Refetch contacts whenever `refreshContacts` changes

  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const openEditModal = (contact: Contact) => {
    setEditContact(contact);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (contact: Contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (contactToDelete) {
      try {
        await apiRequest('DELETE', `/contacts/admin/delete/${contactToDelete.id}`, {});
        setContactToDelete(null);
        setRefreshContacts(!refreshContacts); // Toggle refresh state to refetch contacts
      } catch (error) {
        console.error('Error deleting contact:', error);
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  const handleEdit = async (updatedContact: Contact) => {
    debugger
    try {
      // await apiRequest('PUT', `/contacts/admin/edit/${updatedContact.id}`, updatedContact);
      const formData = new FormData();
      formData.append('name', updatedContact.name);
      formData.append('lastName', updatedContact.lastName);
      formData.append('middleInitial', updatedContact.middleInitial);
      formData.append('phone', updatedContact.phone);
      formData.append('address', updatedContact.address);
      formData.append('email', updatedContact.email);
      formData.append('court', updatedContact.court);
      formData.append('locale', updatedContact.locale);
      formData.append('branch', updatedContact.branch);
      if (updatedContact.file) {
        formData.append('file', updatedContact.file); // Append the image file if selected
      }
      const requestOptions: RequestInit = {
        method: "PUT",
        body: formData,
      };
  const res =  await fetch(`https://pja-admin-nest.9kwf3x.easypanel.host/contacts/admin/edit/${updatedContact.id}`, requestOptions);

      setIsEditModalOpen(false);
      setEditContact(null);
      setRefreshContacts(!refreshContacts); // Toggle refresh state to refetch contacts
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const setEmergency = async (contact: Contact) => {
    try {
      await apiRequest('PUT', `/contacts/admin/emergency/${contact.id}`, {});
      setRefreshContacts(!refreshContacts); // Toggle refresh state to refetch contacts
    } catch (error) {
      console.error('Error setting contact as emergency:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">Contacts Dashboard</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading contacts...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-600">No contacts available</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Picture</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Last Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">M.I</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Emergency Contact</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Court</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Locale</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Branch</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {currentContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-100 transition duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {contact.imagePath ? (
                          <img
                            src={contact.imagePath}
                            alt="Contact"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <img
                          src="data:image/png;base64,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"
                          alt="Contact"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.middleInitial}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {contact.isEmergency ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.court}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.locale}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.branch}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <button onClick={() => openEditModal(contact)} className="text-blue-500 hover:text-blue-700">Edit</button>
                        <button onClick={() => openDeleteModal(contact)} className="text-red-500 hover:text-red-700 ml-4">Delete</button>
                        <button onClick={() => setEmergency(contact)} className="text-yellow-500 hover:text-yellow-700 ml-4">Set Emergency</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="text-sm">Page {currentPage} of {Math.ceil(contacts.length / itemsPerPage)}</span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= contacts.length}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editContact && (
        <Modal
          title="Edit Contact"
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEdit}
          initialData={editContact}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && contactToDelete && (
        <Modal
          title="Confirm Deletion"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          message={`Are you sure you want to delete ${contactToDelete.name}? This action cannot be undone.`}
        />
      )}
    </div>
  );
};

export default Dashboard;
