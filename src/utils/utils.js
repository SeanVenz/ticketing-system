export const sortTicketsByPriority = (tickets, excludeClosed = true) => {
    if (!tickets) return [];

    const priorityValues = {
        "Urgent": 4,
        "High": 3,
        "Medium": 2,
        "Low": 1
    };

    // Create a copy to avoid modifying the original array
    let ticketsToSort = [...tickets];

    // Filter out closed tickets if requested
    if (excludeClosed) {
        ticketsToSort = ticketsToSort.filter(ticket => ticket.status !== 'Closed');
    }

    // Sort by priority
    return ticketsToSort.sort((a, b) => {
        const priorityA = priorityValues[a.priority] || 0;
        const priorityB = priorityValues[b.priority] || 0;

        return priorityB - priorityA;
    });
};

export const getFilteredTickets = (tickets, statusFilter) => {
    if (!tickets) return [];

    let filteredTickets;

    // Apply status filter
    switch (statusFilter) {
        case "open":
            filteredTickets = tickets.filter((ticket) => ticket.status === "Open");
            break;
        case "inProgress":
            filteredTickets = tickets.filter(
                (ticket) => ticket.status === "In Progress"
            );
            break;
        case "closed":
            filteredTickets = tickets.filter(
                (ticket) => ticket.status === "Closed"
            );
            break;
        default:
            filteredTickets = [...tickets];
    }

    // Sort by priority (exclude closed tickets only in "all" view)
    return sortTicketsByPriority(filteredTickets, statusFilter === "all");
};

export const ticketCount = (tickets, status) => {
    return tickets?.filter(ticket => ticket.status === status).length || 0;
}
