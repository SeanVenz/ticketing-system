import { useEffect, useState, useCallback } from "react"
import { getSpecificTickets } from "../utils/apiClient";

export const useGetSpecificTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTickets = useCallback(async () => {
        try {
            setLoading(true);
            
            const userId = localStorage.getItem('userId');
            
            if (!userId) {
                console.warn("No user ID found in localStorage");
                setTickets([]);
                setError("User not authenticated");
                return;
            }
            
            const response = await getSpecificTickets(userId);
            
            if (response?.data?.data) {
                const userTickets = response.data.data.filter(
                    ticket => ticket.userId === userId
                );
                setTickets(userTickets);
            } else {
                setTickets([]);
            }
            setError(null);
        } catch (err) {
            console.error("Failed to fetch tickets:", err);
            setError("Failed to fetch tickets. Please try again later.");
            setTickets([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    // Update the modal container div with backdrop blur

    return { tickets, loading, error, refetch: fetchTickets };
}