import React, { useState } from "react";
import { useGetSpecificTickets } from "../hooks/useGetSpecificTickets";
import { getFilteredTickets, ticketCount } from "../utils/utils";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import TicketModal from "../components/TicketModal";
import Button from "../components/Button";
import StatusFilterTab from "../components/StatusFilterTab";

function Dashboard() {
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);
  // Add status filter state
  const [statusFilter, setStatusFilter] = useState("all");
  const { tickets, loading, error, refetch } = useGetSpecificTickets();

  // Handle ticket update/refresh
  const handleTicketUpdate = () => {
    if (refetch) {
      refetch();
    }
  };

  const filteredTickets = getFilteredTickets(tickets, statusFilter);

  const openTicketsCount = ticketCount(tickets, "Open");
  const inProgressTicketsCount = ticketCount(tickets, "In Progress");
  const closedTicketsCount = ticketCount(tickets, "Closed");
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button
            onClick={() => setIsAddTicketModalOpen(true)}
            types="button"
            type="primary"
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

        {/* Stats Cards */}
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

        {/* Status Filter Tabs */}
        <StatusFilterTab
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          openTicketsCount={openTicketsCount}
          inProgressTicketsCount={inProgressTicketsCount}
          closedTicketsCount={closedTicketsCount}
        />

        {/* Tickets List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {statusFilter === "open"
              ? "Open Tickets"
              : statusFilter === "inProgress"
              ? "In Progress Tickets"
              : statusFilter === "closed"
              ? "Closed Tickets"
              : "All Tickets"}
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                {statusFilter === "all"
                  ? "No tickets found"
                  : `No ${
                      statusFilter === "inProgress"
                        ? "in-progress"
                        : statusFilter
                    } tickets found`}
              </p>
              <Button onClick={() => setIsAddTicketModalOpen(true)}>
                Create Your First Ticket
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => (
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
        <TicketModal
          onClose={() => setIsAddTicketModalOpen(false)}
          onTicketAdded={handleTicketUpdate}
        />
      )}
    </>
  );
}

export default Dashboard;
