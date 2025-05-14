import React from "react";

function TicketHeader({ statusFilter }) {
  return (
    <h2 className="text-xl font-semibold mb-4">
      {statusFilter === "open"
        ? "Open Tickets"
        : statusFilter === "inProgress"
        ? "In Progress Tickets"
        : statusFilter === "forReview"
        ? "For Review Tickets"
        : statusFilter === "closed"
        ? "Closed Tickets"
        : "All Tickets"}
    </h2>
  );
}

export default TicketHeader;
