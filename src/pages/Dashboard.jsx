import React, { useState } from "react";
import { useGetSpecificTickets } from "../hooks/useGetSpecificTickets";
import { getFilteredTickets, ticketCount } from "../utils/utils";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import TicketModal from "../components/TicketModal";
import Button from "../components/Button";
import StatusFilterTab from "../components/StatusFilterTab";
import AddTicket from "../components/AddTicket";
import TicketHeader from "../components/TicketHeader";
import TicketParagraph from "../components/TicketParagraph";
import StatisticsSummary from "../components/StatisticsSummary";

function Dashboard() {
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");
  const { tickets, loading, error, refetch } = useGetSpecificTickets();

  // const userName = localStorage.getItem('userName');

  // Handle ticket update/refresh
  const handleTicketUpdate = () => {
    if (refetch) {
      refetch();
    }
  };

  const handleTicketAdded = () => {
    setIsAddTicketModalOpen(false);

    // Refresh the tickets list
    if (refetch) {
      refetch();
    }
  };

  const filteredTickets = getFilteredTickets(tickets, statusFilter);

  const openTicketsCount = ticketCount(tickets, "Open");
  const inProgressTicketsCount = ticketCount(tickets, "In Progress");
  const forReviewTicketsCount = ticketCount(tickets, "For Review");
  const closedTicketsCount = ticketCount(tickets, "Closed");

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-14 py-6">
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
        <StatisticsSummary
          tickets={tickets}
          openTicketsCount={openTicketsCount}
          inProgressTicketsCount={inProgressTicketsCount}
          forReviewTicketsCount={forReviewTicketsCount}
          closedTicketsCount={closedTicketsCount}
          isAdmin={false}
        />

        {/* Status Filter Tabs */}
        <StatusFilterTab
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          openTicketsCount={openTicketsCount}
          inProgressTicketsCount={inProgressTicketsCount}
          forReviewTicketsCount={forReviewTicketsCount}
          closedTicketsCount={closedTicketsCount}
        />

        {/* Tickets List */}
        <div className="mb-8">
          <TicketHeader statusFilter={statusFilter} />
          {loading ? (
            <p className="text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-8">
              <TicketParagraph statusFilter={statusFilter} />
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
        <AddTicket
          onTicketAdded={handleTicketAdded}
          onClose={() => setIsAddTicketModalOpen(false)}
        />
      )}
    </>
  );
}

export default Dashboard;
