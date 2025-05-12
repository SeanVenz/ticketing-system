import { useEffect, useState } from "react"
import { getProjects } from "../utils/apiClient";

export const useGetAllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const response = await getProjects();
                if (response?.data?.data) {
                    setProjects(response?.data?.data);
                } else {
                    setProjects([]);
                }
                setError(null);
            } catch (err) {
                console.error("Failed to fetch Projects:", err);
                setError("Failed to fetch projects. Please try again later.");
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, []);

    return { projects, loading, error };
}