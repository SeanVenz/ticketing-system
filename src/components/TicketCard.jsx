import React, { useState } from 'react';
import { updateTicket, deleteTicket } from '../utils/apiClient';
import { useGetAllProjects } from '../hooks/useGetAllProjects';

const TicketCard = ({ ticket, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDescription, setEditDescription] = useState(ticket.description);
  const [editProjectName, setEditProjectName] = useState(ticket.projectName);
  const [isUpdating, setIsUpdating] = useState(false);
  const { projects, loading: projectsLoading } = useGetAllProjects();

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await updateTicket(ticket.id, editDescription, editProjectName);
      if (response?.data?.success) {
        setIsModalOpen(false);
        // Notify parent component to refresh data
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTicket(ticket.id);
      // Notify parent component to refresh data
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <>
      {/* Card */}
      <div 
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Project Header */}
        <div className="bg-blue-600 p-4 text-white">
          <h3 className="font-bold text-lg truncate">{ticket.projectName}</h3>
        </div>

        {/* Card Body */}
        <div className="p-4">
          <p className="text-gray-700 mb-3">{ticket.description}</p>
          
          {/* Image Preview (if exists) */}
          {ticket.file_url && ticket.file_metadata?.file_url?.url && (
            <div className="mb-3">
              <img 
                src={`http://localhost:3000${ticket.file_metadata.file_url.url.replace('/undefined/', '/be9f9147-80e9-4ff0-b06f-8ae787edc6dc/')}`}
                alt={`Attachment for ${ticket.projectName}`}
                className="w-full h-32 object-cover rounded-md"
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Card Footer */}
          <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
            <span>ID: {ticket.id.substring(0, 8)}...</span>
            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50"
             onClick={() => setIsModalOpen(false)}>
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 shadow-xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>
            
            {/* Project Name Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Project
              </label>
              {projectsLoading ? (
                <p>Loading projects...</p>
              ) : (
                <select
                  value={editProjectName}
                  onChange={(e) => setEditProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {projects && projects.map((project) => (
                    <option key={project.id} value={project.projectName}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea 
                value={editDescription} 
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>

            {/* Display image if exists */}
            {ticket.file_url && ticket.file_metadata?.file_url?.url && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Attachment
                </label>
                <img 
                  src={`http://localhost:3000${ticket.file_metadata.file_url.url.replace('/undefined/', '/be9f9147-80e9-4ff0-b06f-8ae787edc6dc/')}`}
                  alt={`Attachment for ${ticket.projectName}`}
                  className="w-full max-h-60 object-contain rounded-md"
                  crossOrigin="anonymous"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <div>
                <button 
                  onClick={handleDelete} 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                >
                  Delete
                </button>
              </div>

              <div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdate} 
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketCard;