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
    try {
      await apiRequest('PUT', `/contacts/admin/edit/${updatedContact.id}`, updatedContact);
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
