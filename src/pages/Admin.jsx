import React, { useState } from "react";
import { useGetAllTickets } from "../hooks/useGetAllTickets";
import Navbar from "../components/Navbar";
import { addProject } from "../utils/apiClient";
import { useGetAllProjects } from "../hooks/useGetAllProjects";

function Admin() {
  const { tickets, loading, error } = useGetAllTickets();
  const [project, setProject] = useState('');
  const {projects} = useGetAllProjects();

  const addSingleProject = async () => {
    const add = await addProject(project); 
    console.log(add);
  }

  return (
    <>
    <div className="flex gap-4 flex-col">
      <Navbar/>
    <div className="mt-2">
      Admin

      <div>
        Add Projects:

        <input type="text" onChange={(e) => setProject(e.target.value)}/>
        <button onClick={addSingleProject}>Add Project</button>
      </div>

      <div>
          <h2>All Projects</h2>
          {projects.map((project) => (
            <div key={project.id}>
              <p>Project Name: {project.projectName}</p>
              
            </div>
          ))}
        </div>


      {loading ? (
        <p>Loading tickets...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <div>
          <h2>All Tickets</h2>
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <p>ID: {ticket.id}</p>
              <p>Project: {ticket.projectName}</p>
              <p>Description: {ticket.description}</p>
              <p>Username: {ticket.userName}</p>

              {ticket.file_url && ticket.file_metadata?.file_url?.url && (
                <div className="attachment">
                  <img
                    src={`http://localhost:3000${ticket.file_metadata.file_url.url.replace(
                      "/undefined/",
                      "/be9f9147-80e9-4ff0-b06f-8ae787edc6dc/"
                    )}`}
                    alt={`Attachment for ${ticket.projectName}`}
                    className="ticket-image"
                    crossOrigin="anonymous" // Try adding this
                    onError={(e) => {
                      console.error("Image failed to load:", e.target.src);
                      e.target.style.display = "none";
                      e.target.parentNode.innerHTML +=
                        "<p>Image failed to load</p>";
                    }}
                  />
                </div>
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div></div>
    </>
  );
}

export default Admin;
