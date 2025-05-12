import React, { useState, useEffect } from 'react';
import { useGetAllTickets } from '../hooks/useGetAllTickets';
import { useGetAllProjects } from '../hooks/useGetAllProjects';
import Navbar from '../components/Navbar';
import TicketCard from '../components/TicketCard';

function Admin() {
  // Initialize with default values to prevent errors
  const { tickets = [], loading = true, error = null, refetch } = useGetAllTickets();
  const { projects = [] } = useGetAllProjects();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to refresh tickets after update/delete
  const handleTicketUpdate = () => {
    if (refetch) {
      refetch();
    } else {
      setRefreshTrigger(prev => prev + 1);
    }
  };

  // Effect to refetch tickets when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger > 0) {
      window.location.reload();
    }
  }, [refreshTrigger]);

  // Added error boundary wrapper
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-800">Total Tickets</h2>
            <p className="text-3xl font-bold text-blue-600">{tickets?.length || 0}</p>
          </div>
          
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-800">Total Projects</h2>
            <p className="text-3xl font-bold text-green-600">{projects?.length || 0}</p>
          </div>
          
          <div className="bg-purple-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-800">Active Users</h2>
            <p className="text-3xl font-bold text-purple-600">
              {/* Safe access with optional chaining and fallback */}
              {tickets && tickets.length > 0 ? new Set(tickets.map(ticket => ticket?.userId || '')).size : 0}
            </p>
          </div>
        </div>

        {/* Tickets Table View for Quick Reference */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          
          {loading ? (
            <p className="text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : tickets.length === 0 ? (
            <p className="text-gray-500">No tickets found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Has Attachment</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket?.id || Math.random()} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{ticket?.projectName || 'Unnamed Project'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ticket?.userName || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{ticket?.userId ? ticket.userId.substring(0, 8) + '...' : 'No ID'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'Unknown date'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket?.file_url ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* All Tickets with TicketCard Component */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">All Tickets</h2>
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
                  key={ticket?.id || Math.random()}
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

export default Admin;
