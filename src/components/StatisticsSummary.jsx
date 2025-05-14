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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 w-full items-center justify-center">
      {/* Total Tickets */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-blue-100">Total Tickets</h2>
            <p className="text-3xl font-bold text-white mt-1">
              {tickets?.length || 0}
            </p>
          </div>
          <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Open Tickets */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-green-100">Open Tickets</h2>
            <p className="text-3xl font-bold text-white mt-1">{openTicketsCount}</p>
          </div>
          <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* In Progress Tickets */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-amber-100">In Progress</h2>
            <p className="text-3xl font-bold text-white mt-1">{inProgressTicketsCount}</p>
          </div>
          <div className="bg-amber-400 bg-opacity-30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* For Review Tickets */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-indigo-100">For Review</h2>
            <p className="text-3xl font-bold text-white mt-1">{forReviewTicketsCount}</p>
          </div>
          <div className="bg-indigo-400 bg-opacity-30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Closed Tickets */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">Closed Tickets</h2>
            <p className="text-3xl font-bold text-white mt-1">{closedTicketsCount}</p>
          </div>
          <div className="bg-gray-500 bg-opacity-30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Users - Only visible to admins */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-purple-100">Active Users</h2>
              <p className="text-3xl font-bold text-white mt-1">{userNumber}</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsSummary;
