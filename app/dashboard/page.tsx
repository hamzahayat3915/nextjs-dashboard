'use client'; // Use this only if necessary, otherwise remove for SSR
import React, { useState, useEffect } from 'react';
import { apiRequest } from '../lib/utils'; // Adjust the import path as necessary
import Modal from '../ui/Modal'; // Import your Modal component here

interface Contact {
  id: number;
  name: string;
  phone: string;
  isEmergency: boolean;
  isVisibleToAll: boolean;
  address: string;
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

  useEffect(() => {
    const fetchContacts = async () => {
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
  }, [contacts]);

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
      console.log('Deleting contact:', contactToDelete);
      try {
        const requestOptions: any = {
          method: "DELETE",
          redirect: "follow"
        };
        fetch(`http://localhost:3000/contacts/admin/delete/${contactToDelete.id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error))
        setContacts((prev) => prev.filter((c) => c.id !== contactToDelete.id));
        setContactToDelete(null);
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
      setContacts((prev) =>
        prev.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
      );
      setIsEditModalOpen(false);
      setEditContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const setEmergency = async(contact : any)=>{
    try {
      await apiRequest('PUT', `/contacts/admin/emergency/${contact.id}`, {});
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }

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
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Emergency Contact</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Visible to All</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {currentContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-100 transition duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {contact.isEmergency ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {contact.isVisibleToAll ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-2">
                        <button onClick={() => openEditModal(contact)} className="text-blue-500 hover:text-blue-700">
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                          </svg>

                        </button>
                        <button onClick={() => openDeleteModal(contact)} className="text-red-500 hover:text-red-700">
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd" />
                          </svg>

                        </button>
                        <button onClick={() => setEmergency(contact)} className="text-red-500 hover:text-red-700">
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                          </svg>

                        </button>
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
              <span className="text-sm">
                Page {currentPage} of {Math.ceil(contacts.length / itemsPerPage)}
              </span>
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
