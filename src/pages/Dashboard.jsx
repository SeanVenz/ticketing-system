import React, { useState, useEffect } from "react";
import { useGetSpecificTickets } from "../hooks/useGetSpecificTickets";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import AddTicket from "../components/AddTicket";
import Button from "../components/Button";

function Dashboard() {
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { tickets, loading, error, refetch } = useGetSpecificTickets();

  // Function to refresh tickets after update/delete
  const handleTicketUpdate = () => {
    // Trigger refetch of tickets
    if (refetch) {
      refetch();
    } else {
      // Fallback if refetch isn't available
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  // Effect to refetch tickets when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger > 0) {
      window.location.reload();
    }
  }, [refreshTrigger]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button
            onClick={() => setIsAddTicketModalOpen(true)}
            type={"primary"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Ticket
          </Button>
        </div>

        {/* Ticket Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Total Tickets
            </h3>
            <p className="text-2xl font-bold text-blue-900">
              {tickets?.length || 0}
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-green-800 mb-2">
              Open Tickets
            </h3>
            <p className="text-2xl font-bold text-green-900">
              {tickets?.filter((ticket) => ticket.status === "Open").length ||
                0}
            </p>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-purple-800 mb-2">
              In Progress
            </h3>
            <p className="text-2xl font-bold text-purple-900">
              {tickets?.filter((ticket) => ticket.status === "In Progress")
                .length || 0}
            </p>
          </div>
        </div>

        {/* Tickets List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
          {loading ? (
            <p className="text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : tickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No tickets found</p>
              <button
                onClick={() => setIsAddTicketModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              >
                Create Your First Ticket
              </button>
            </div>
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

      {/* Add Ticket Modal */}
      {isAddTicketModalOpen && (
        <AddTicket
          onClose={() => setIsAddTicketModalOpen(false)}
          onTicketAdded={handleTicketUpdate}
        />
      )}
    </>
  );
}

export default Dashboard;
