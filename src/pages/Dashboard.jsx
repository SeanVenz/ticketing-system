import React, { useState, useRef } from 'react'
import { addTickets, addTicketWithImage } from '../utils/apiClient'
import { useGetSpecificTickets } from '../hooks/useGetSpecificTickets';
import Navbar from '../components/Navbar';
import { useGetAllProjects } from '../hooks/useGetAllProjects';

function Dashboard() {
    const [projectName, setProjectName] = useState('');
    const [description, setProjectDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const {tickets, loading, error} = useGetSpecificTickets();
    const {projects, loading: projectsLoading, error: projectsError} = useGetAllProjects();

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
        setFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const addTicket = async(e) => {
        e.preventDefault();
        setIsUploading(true);
        
        try {
            const userId = localStorage.getItem('userId');
            const userName = localStorage.getItem('userName');
            
            let response;
            if (attachment) {
                // Use the function with image upload
                response = await addTicketWithImage(
                    projectName, 
                    description, 
                    userId, 
                    userName, 
                    attachment
                );
            } else {
                // Use the regular function without image
                response = await addTickets(
                    projectName, 
                    description, 
                    userId, 
                    userName
                );
            }
            
            if(response?.data?.success === true){
                setProjectName('');
                setProjectDescription('');
                clearFileInput();
                // Reload tickets to show the new one
                window.location.reload();
            }
        } catch (error) {
            console.error("Error adding ticket:", error);
        } finally {
            setIsUploading(false);
        }
    };

  return (
    <>
    <Navbar/>
    <div className="">
        
        <h1>Dashboard</h1>
        
        <div className="ticket-form">
            <h2>Add New Ticket</h2>
            <form onSubmit={addTicket}>
                <div className="form-group">
                    <label htmlFor="projectName">Project</label>
                    {projectsLoading ? (
                        <p>Loading projects...</p>
                    ) : projectsError ? (
                        <p>Error loading projects: {projectsError}</p>
                    ) : (
                        <select
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                            className="project-select"
                        >
                            <option value="">Select a project</option>
                            {projects && projects.map((project) => (
                                <option key={project.id} value={project.projectName}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description"
                        value={description} 
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Enter description" 
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="attachment">Attachment (Optional)</label>
                    <div className="file-input-container">
                        <input 
                            id="attachment"
                            type="file" 
                            onChange={handleFileChange}
                            ref={fileInputRef}
                        />
                        {fileName && (
                            <div className="file-name">
                                <span>{fileName}</span>
                                <button 
                                    type="button" 
                                    onClick={clearFileInput} 
                                    className="clear-file"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isUploading || !projectName}
                    className="submit-button"
                >
                    {isUploading ? 'Creating Ticket...' : 'Create Ticket'}
                </button>
            </form>
        </div>

        <div className="tickets-list">
            <h2>Your Tickets</h2>
            {loading ? (
                <p>Loading tickets...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : tickets.length === 0 ? (
                <p>No tickets found</p>
            ) : (
                <div className="tickets-grid">
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className="ticket-card">
                            <h3>{ticket.projectName}</h3>
                            <p className="description">{ticket.description}</p>
                            <p className="ticket-id">ID: {ticket.id}</p>
                            
                            {/* Only display the image if file_url exists */}
                            {ticket.file_url && ticket.file_metadata?.file_url?.url && (
                                <div className="attachment">
                                    <img 
                                        src={`http://localhost:3000${ticket.file_metadata.file_url.url.replace('/undefined/', '/be9f9147-80e9-4ff0-b06f-8ae787edc6dc/')}`}
                                        alt={`Attachment for ${ticket.projectName}`}
                                        className="ticket-image"
                                        crossOrigin="anonymous" // Try adding this
                                        onError={(e) => {
                                            console.error("Image failed to load:", e.target.src);
                                            e.target.style.display = 'none';
                                            e.target.parentNode.innerHTML += "<p>Image failed to load</p>";
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    </>
  );
}

export default Dashboard;