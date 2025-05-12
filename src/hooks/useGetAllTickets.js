import { useEffect, useState } from "react"
import { getSpecificTickets } from "../utils/apiClient";

export const useGetAllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const response = await getSpecificTickets();
                if (response?.data?.data) {
                    setTickets(response?.data?.data);
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
        };

        fetchTickets();
    }, []);

    return { tickets, loading, error };
}