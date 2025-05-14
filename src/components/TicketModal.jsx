import React, { useState, useRef, useEffect } from "react";
import { useGetAllProjects } from "../hooks/useGetAllProjects";

const TicketModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  initialData = {},
  isSaving = false,
  onDelete,
  showDeleteButton = false
}) => {
  // State values
  const [projectName, setProjectName] = useState(initialData.projectName || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [priority, setPriority] = useState(initialData.priority || "Medium");
  const [status, setStatus] = useState(initialData.status || "Open");
  const [date, setDate] = useState(initialData.date || "");
  const [category, setCategory] = useState(initialData.category || "Bug");
  const [devComment, setDevComment] = useState(initialData.devComment || "");
  const [attachment, setAttachment] = useState(null);
  const [fileName, setFileName] = useState("");
  
  // Refs
  const fileInputRef = useRef(null);
  const modalContentRef = useRef(null);

  // Check if user is admin
  const isAdmin = localStorage.getItem("userId") === "eafe4269-72c2-489d-8739-db7e522b7900";

  const { projects, loading: projectsLoading } = useGetAllProjects();

  // Update state when initialData changes (e.g. when editing different tickets)
  useEffect(() => {
    setProjectName(initialData.projectName || "");
    setDescription(initialData.description || "");
    setPriority(initialData.priority || "Medium");
    setStatus(initialData.status || "Open");
    setDate(initialData.date || "");
    setCategory(initialData.category || "Bug");
    setDevComment(initialData.devComment || "");
  }, [initialData]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setAttachment(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Clear the file input
  const clearFileInput = (e) => {
    if (e) e.preventDefault();
    setAttachment(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      projectName,
      description,
      priority,
      status,
      date,
      category,
      devComment,
      attachment
    });
  };

  // Handler for backdrop clicks
  const handleBackdropClick = (e) => {
    // Only close if the click is directly on the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle the delete action
  const handleDelete = (e) => {
    if (e) e.preventDefault();
    if (onDelete) onDelete();
  };

  // Handle the cancel action
  const handleCancel = (e) => {
    if (e) e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={`${title}-dialog`}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" 
        onClick={handleBackdropClick}
      />

      {/* Modal content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          ref={modalContentRef}
          className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative z-10 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold" id={`${title}-dialog`}>{title}</h2>
            <button 
              type="button"
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Project Name Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="projectName"
                className="block text-gray-700 font-medium mb-2"
              >
                Project
              </label>
              {projectsLoading ? (
                <p>Loading projects...</p>
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

            {/* Description */}
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
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>

            {/* File Upload (only show in Add mode) */}
            {!initialData.id && (
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
            )}

            {/* Two columns for the remaining fields on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Priority */}
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
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              {/* Status */}
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
                  <option value="For Review">For Review</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Category */}
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

              {/* Due Date */}
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
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Display image if exists (Edit mode) */}
            {initialData.file_url && initialData.file_metadata?.file_url?.url && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Attachment
                </label>
                <img
                  src={`http://localhost:3000${initialData.file_metadata.file_url.url.replace(
                    "/undefined/",
                    "/be9f9147-80e9-4ff0-b06f-8ae787edc6dc/"
                  )}`}
                  alt={`Attachment for ${initialData.projectName}`}
                  className="w-full max-h-60 object-contain rounded-md"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML += "<p class='text-red-500 text-sm'>Image failed to load</p>";
                  }}
                />
              </div>
            )}

            {/* Developer Comment field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Developer Comment
              </label>
              <textarea
                value={devComment}
                onChange={(e) => setDevComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                readOnly={!isAdmin}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <div>
                {showDeleteButton && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !projectName}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;