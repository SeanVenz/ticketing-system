import React from 'react'

function TicketParagraph({statusFilter}) {
  return (
    <p className="text-gray-500">
              {statusFilter === "all"
                ? "No tickets found"
                : `No ${
                    statusFilter === "inProgress"
                      ? "in-progress"
                      : statusFilter === "forReview"
                      ? "for review"
                      : statusFilter
                  } tickets found`}
            </p>
  )
}

export default TicketParagraph