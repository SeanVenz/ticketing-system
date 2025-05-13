import React, { useState, useEffect } from "react";
import { useGetAllTickets } from "../hooks/useGetAllTickets";
// import { useGetAllProjects } from "../hooks/useGetAllProjects";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import { getAllUsers } from "../utils/apiClient";
import { getFilteredTickets, ticketCount } from "../utils/utils";
import StatusFilterTab from "../components/StatusFilterTab";

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
            <p className="text-2xl font-bold text-purple-600">
              {userNumber}
            </p>
          </div>
        </div>

        {/* Status Filter Tabs */}

        <StatusFilterTab statusFilter={statusFilter} setStatusFilter={setStatusFilter} openTicketsCount={openTicketsCount} inProgressTicketsCount={inProgressTicketsCount} closedTicketsCount={closedTicketsCount}/>

        {/* Tickets Table View for Quick Reference */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {statusFilter === "open" ? "Open Tickets Overview" :
             statusFilter === "inProgress" ? "In Progress Tickets Overview" :
             statusFilter === "closed" ? "Closed Tickets Overview" : "All Tickets Overview"}
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : filteredTickets.length === 0 ? (
            <p className="text-gray-500">No tickets found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Project
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Priority
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Has Attachment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket?.id || Math.random()}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {ticket?.projectName || "Unnamed Project"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ticket?.userName || "Unknown"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {ticket?.userId
                            ? ticket.userId.substring(0, 8) + "..."
                            : "No ID"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${ticket.status === "Open" ? "bg-green-100 text-green-800" : 
                            ticket.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${ticket.priority === "Urgent" ? "bg-red-100 text-red-800" : 
                            ticket.priority === "High" ? "bg-orange-100 text-orange-800" :
                            ticket.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-blue-100 text-blue-800"}`}>
                          {ticket.priority || "Low"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket?.createdAt
                          ? new Date(ticket.createdAt).toLocaleDateString()
                          : "Unknown date"}
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
          <h2 className="text-xl font-semibold mb-4">
            {statusFilter === "open" ? "Open Tickets" :
             statusFilter === "inProgress" ? "In Progress Tickets" :
             statusFilter === "closed" ? "Closed Tickets" : "All Tickets"}
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : filteredTickets.length === 0 ? (
            <p className="text-gray-500">
              {statusFilter === "all" ? 
                "No tickets found" : 
                `No ${statusFilter === "inProgress" ? "in-progress" : statusFilter} tickets found`}
            </p>
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
