import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {

    const [dashData, setDashData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/dashboard`);
                if (data.success) {
                    setDashData(data);
                    setLoading(false);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDashData();
    }, []);

    if (loading) {
        return (
            <div className="text-gray-600">Loading...</div>
        );
    }

    const { users, products, categories } = dashData;

    return dashData && (
        <div>
            <h1 className="text-2xl font-normal mb-4">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-semibold">Total Users</h2>
                    <p className="text-3xl font-semibold">{users}</p>
                </div>

                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-semibold">Total Products</h2>
                    <p className="text-3xl font-semibold">{products}</p>
                </div>

                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-semibold">Total Categories</h2>
                    <p className="text-3xl font-semibold">{categories}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;