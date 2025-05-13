import React, { useState, useRef } from "react";
import { addTickets, addTicketWithImage } from "../utils/apiClient";
import { useGetAllProjects } from "../hooks/useGetAllProjects";
import Button from "./Button";

function AddTicket({ onTicketAdded, onClose }) {
  const [projectName, setProjectName] = useState("");
  const [description, setProjectDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("Open");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useGetAllProjects();

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setAttachment(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Clear the file input
  const clearFileInput = () => {
    setAttachment(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");

      let response;
      if (attachment) {
        response = await addTicketWithImage(
          projectName,
          description,
          userId,
          userName,
          attachment,
          priority,
          status,
          date,
          category
        );
      } else {
        response = await addTickets(
          projectName,
          description,
          userId,
          userName,
          priority,
          status,
          date,
          category
        );
      }

      if (response?.data?.success === true) {
        // Reset form
        setProjectName("");
        setProjectDescription("");
        setPriority("");
        setStatus("Open");
        setDate("");
        setCategory("");
        clearFileInput();
        
        // Notify parent component
        if (onTicketAdded) onTicketAdded();
        
        // Close modal
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Error adding ticket:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 shadow-xl overflow-auto max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Ticket</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-gray-700 font-medium mb-2"
            >
              Project
            </label>
            {projectsLoading ? (
              <p>Loading projects...</p>
            ) : projectsError ? (
              <p className="text-red-500">
                Error loading projects: {projectsError}
              </p>
            ) : (
              <select
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a project</option>
                {projects &&
                  projects.map((project) => (
                    <option key={project.id} value={project.projectName}>
                      {project.projectName}
                    </option>
                  ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Enter description"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="attachment"
              className="block text-gray-700 font-medium mb-2"
            >
              Attachment (Optional)
            </label>
            <div className="flex items-center">
              <input
                id="attachment"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <label
                htmlFor="attachment"
                className="cursor-pointer bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
              >
                Choose File
              </label>
              {fileName && (
                <div className="ml-3 flex items-center">
                  <span className="text-sm text-gray-600">{fileName}</span>
                  <button
                    type="button"
                    onClick={clearFileInput}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Create two columns for the remaining fields on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="priority"
                className="block text-gray-700 font-medium mb-2"
              >
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 font-medium mb-2"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Bug">Bug</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Support">Support</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 font-medium mb-2"
              >
                Target Due Date
              </label>
              <input
                type="date"
                id="date"
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <Button
              onClick={onClose}
              type={"secondary"}
            >
              Cancel
            </Button>
            <Button
              types="submit"
              disabled={isUploading || !projectName}
              type="primary"
            >
              {isUploading ? "Creating Ticket..." : "Create Ticket"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTicket;