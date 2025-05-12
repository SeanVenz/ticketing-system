import React, { useState, useRef, useEffect } from 'react'
import { addTickets, addTicketWithImage } from '../utils/apiClient'
import { useGetSpecificTickets } from '../hooks/useGetSpecificTickets';
import Navbar from '../components/Navbar';
import { useGetAllProjects } from '../hooks/useGetAllProjects';
import TicketCard from '../components/TicketCard';

function Dashboard() {
    const [projectName, setProjectName] = useState('');
    const [description, setProjectDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const fileInputRef = useRef(null);
    
    const {tickets, loading, error, refetch} = useGetSpecificTickets();
    const {projects, loading: projectsLoading, error: projectsError} = useGetAllProjects();

    // Function to refresh tickets after update/delete
    const handleTicketUpdate = () => {
        // Trigger refetch of tickets
        if (refetch) {
            refetch();
        } else {
            // Fallback if refetch isn't available
            setRefreshTrigger(prev => prev + 1);
        }
    };

    // Effect to refetch tickets when refreshTrigger changes
    useEffect(() => {
        if (refreshTrigger > 0) {
            window.location.reload();
        }
    }, [refreshTrigger]);

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
                response = await addTicketWithImage(
                    projectName, 
                    description, 
                    userId, 
                    userName, 
                    attachment
                );
            } else {
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
                handleTicketUpdate();
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
    <div className="container mx-auto px-4 py-6">
        
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Add Ticket Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Ticket</h2>
            <form onSubmit={addTicket}>
                <div className="mb-4">
                    <label htmlFor="projectName" className="block text-gray-700 font-medium mb-2">Project</label>
                    {projectsLoading ? (
                        <p>Loading projects...</p>
                    ) : projectsError ? (
                        <p className="text-red-500">Error loading projects: {projectsError}</p>
                    ) : (
                        <select
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
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
                    <label htmlFor="attachment" className="block text-gray-700 font-medium mb-2">Attachment (Optional)</label>
                    <div className="flex items-center">
                        <input 
                            id="attachment"
                            type="file" 
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
                
                <button 
                    type="submit" 
                    disabled={isUploading || !projectName}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:bg-blue-300"
                >
                    {isUploading ? 'Creating Ticket...' : 'Create Ticket'}
                </button>
            </form>
        </div>

        {/* Tickets List */}
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
            {loading ? (
                <p className="text-gray-500">Loading tickets...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : tickets.length === 0 ? (
                <p className="text-gray-500">No tickets found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => (
                        <TicketCard 
                            key={ticket.id} 
                            ticket={ticket} 
                            onUpdate={handleTicketUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
    </>
  );
}

export default Dashboard;