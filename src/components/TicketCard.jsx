import React, { useState } from 'react';
import { updateTicket, deleteTicket } from '../utils/apiClient';
import { useGetAllProjects } from '../hooks/useGetAllProjects';

const TicketCard = ({ ticket, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDescription, setEditDescription] = useState(ticket.description);
  const [editProjectName, setEditProjectName] = useState(ticket.projectName);
  const [editPriority, setEditPriority] = useState(ticket.priority || "Medium");
  const [editStatus, setEditStatus] = useState(ticket.status || "Open");
  const [editDate, setEditDate] = useState(ticket.date || "");
  const [editCategory, setEditCategory] = useState(ticket.category || "Bug");
  const [isUpdating, setIsUpdating] = useState(false);
  const { projects, loading: projectsLoading } = useGetAllProjects();

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await updateTicket(
        ticket.id, 
        editDescription, 
        editProjectName,
        editPriority,
        editStatus,
        editDate,
        editCategory
      );
      
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

  // Get priority badge color
  const getPriorityBadgeColor = (priority) => {
    switch(priority) {
      case 'Low': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
          
          {/* Status and Priority Badges */}
          <div className="flex space-x-2 mt-2">
            {ticket.status && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(ticket.status)}`}>
                {ticket.status}
              </span>
            )}
            {ticket.priority && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
            )}
          </div>
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

          {/* Additional Info */}
          <div className="text-sm text-gray-600 mb-3">
            {ticket.category && (
              <div className="mb-1">
                <span className="font-medium">Category:</span> {ticket.category}
              </div>
            )}
            {ticket.date && (
              <div>
                <span className="font-medium">Due Date:</span> {new Date(ticket.date).toLocaleDateString()}
              </div>
            )}
          </div>

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

            {/* Priority */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Priority
              </label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Bug">Bug</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Support">Support</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Target Due Date
              </label>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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