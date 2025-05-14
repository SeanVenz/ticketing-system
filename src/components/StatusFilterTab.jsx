import React from "react";

function StatusFilterTab({ statusFilter, setStatusFilter, openTicketsCount, inProgressTicketsCount, forReviewTicketsCount, closedTicketsCount }) {
  console.log('StatusFilterTab received counts:', {
    open: openTicketsCount,
    inProgress: inProgressTicketsCount,
    forReview: forReviewTicketsCount,
    closed: closedTicketsCount
  });
  
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setStatusFilter("all")}
            className={`mr-8 py-4 px-1 cursor-pointer border-b-2 font-medium text-sm ${
              statusFilter === "all"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("open")}
            className={`mr-8 py-4 cursor-pointer px-1 border-b-2 font-medium text-sm ${
              statusFilter === "open"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Open ({openTicketsCount})
          </button>
          <button
            onClick={() => setStatusFilter("inProgress")}
            className={`mr-8 py-4 cursor-pointer px-1 border-b-2 font-medium text-sm ${
              statusFilter === "inProgress"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            In Progress ({inProgressTicketsCount})
          </button>
          <button
            onClick={() => setStatusFilter("forReview")}
            className={`mr-8 py-4 cursor-pointer px-1 border-b-2 font-medium text-sm ${
              statusFilter === "forReview" 
                ? "border-amber-500 text-amber-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            For Review ({forReviewTicketsCount})
          </button>
          <button
            onClick={() => setStatusFilter("closed")}
            className={`py-4 cursor-pointer px-1 border-b-2 font-medium text-sm ${
              statusFilter === "closed"
                ? "border-gray-500 text-gray-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Closed ({closedTicketsCount})
          </button>
        </nav>
      </div>
    </div>
  );
}

export default StatusFilterTab;
