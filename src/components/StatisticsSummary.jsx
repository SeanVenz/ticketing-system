import React from "react";

function StatisticsSummary({
  tickets,
  openTicketsCount,
  inProgressTicketsCount,
  forReviewTicketsCount,
  userNumber,
  closedTicketsCount,
  isAdmin,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-blue-800">Total Tickets</h2>
        <p className="text-2xl font-bold text-blue-600">
          {tickets?.length || 0}
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-green-800">Open Tickets</h2>
        <p className="text-2xl font-bold text-green-600">{openTicketsCount}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-yellow-800">In Progress</h2>
        <p className="text-2xl font-bold text-yellow-600">
          {inProgressTicketsCount}
        </p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-yellow-800">For Review</h2>
        <p className="text-2xl font-bold text-yellow-600">
          {forReviewTicketsCount}
        </p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-yellow-800">
          Closed Tickets
        </h2>
        <p className="text-2xl font-bold text-yellow-600">
          {closedTicketsCount}
        </p>
      </div>

      {isAdmin ? (
        <>
          <div className="bg-purple-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-purple-800">
              Active Users
            </h2>
            <p className="text-2xl font-bold text-purple-600">{userNumber}</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default StatisticsSummary;
