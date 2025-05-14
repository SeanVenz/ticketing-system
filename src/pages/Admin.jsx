import React, { useState, useEffect } from "react";
import { useGetAllTickets } from "../hooks/useGetAllTickets";
// import { useGetAllProjects } from "../hooks/useGetAllProjects";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import { getAllUsers } from "../utils/apiClient";
import { getFilteredTickets, ticketCount } from "../utils/utils";
import StatusFilterTab from "../components/StatusFilterTab";
import TicketHeader from "../components/TicketHeader";
import TicketParagraph from "../components/TicketParagraph";

function Admin() {
  const {
    tickets = [],
    loading = true,
    error = null,
    refetch,
  } = useGetAllTickets();
  // const { projects = [] } = useGetAllProjects();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [userNumber, setUserNumber] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = getFilteredTickets(tickets, statusFilter);

  useEffect(() => {
    const getUserNum = async () => {
      const userNum = await getAllUsers();
      console.log(userNum);
      setUserNumber(userNum.data.data.length);
    };
    getUserNum();
  }, []);

  // Add this useEffect for debugging
  // useEffect(() => {
  //   // Check if tickets are loaded
  //   if (tickets && tickets.length > 0) {
  //     // Log all unique statuses
  //     const uniqueStatuses = [...new Set(tickets.map(t => t.status))];
  //     console.log("All unique status values:", uniqueStatuses);

  //     // Check specifically for For Review tickets
  //     const forReviewTickets = tickets.filter(t => t.status === "For Review");
  //     console.log("For Review tickets:", forReviewTickets);

  //     // Check if forReviewTicketsCount is calculated correctly
  //     console.log("For Review count:", forReviewTicketsCount);
  //   }
  // }, [tickets, forReviewTicketsCount]);

  const handleTicketUpdate = () => {
    if (refetch) {
      refetch();
    } else {
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (refreshTrigger > 0) {
      window.location.reload();
    }
  }, [refreshTrigger]);

  const openTicketsCount = ticketCount(tickets, "Open");
  const inProgressTicketsCount = ticketCount(tickets, "In Progress");
  const forReviewTicketsCount = ticketCount(tickets, "For Review");
  console.log("here", forReviewTicketsCount);
  const closedTicketsCount = ticketCount(tickets, "Closed");

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-blue-800">
              Total Tickets
            </h2>
            <p className="text-2xl font-bold text-blue-600">
              {tickets?.length || 0}
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-green-800">
              Open Tickets
            </h2>
            <p className="text-2xl font-bold text-green-600">
              {openTicketsCount}
            </p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-yellow-800">
              In Progress
            </h2>
            <p className="text-2xl font-bold text-yellow-600">
              {inProgressTicketsCount}
            </p>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-purple-800">
              Active Users
            </h2>
            <p className="text-2xl font-bold text-purple-600">{userNumber}</p>
          </div>
        </div>

        {/* Status Filter Tabs */}

        <StatusFilterTab
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          openTicketsCount={openTicketsCount}
          inProgressTicketsCount={inProgressTicketsCount}
          forReviewTicketsCount={forReviewTicketsCount}
          closedTicketsCount={closedTicketsCount}
        />

        {/* All Tickets with TicketCard Component */}
        <div className="mb-8">
          <TicketHeader statusFilter={statusFilter}/>
          {loading ? (
            <p className="text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : filteredTickets.length === 0 ? (
            <TicketParagraph statusFilter={statusFilter}/>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => (
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
