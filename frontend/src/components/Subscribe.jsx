import { useState } from "react";
import axios from "axios";

const Subscribe = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BASE_URL;

    const handleSubscription = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const { data } = await axios.post(`${backendUrl}/email/subscribe`, { email });

            if (data.success) {
                setMessage(data.message);
                setEmail('');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-ping w-12 h-12 rounded-full border-t-4 border-primary border-4"></div>
        </div>
    }

    return (
        <section className="py-8 bg-gray-100 text-center px-8">
            <div className="w-full mx-auto bg-white py-4 px-8 rounded md:w-[550px]">
                <h2 className="text-2xl font-bold mb-4">Stay Updated!</h2>
                <p className="mb-6 text-gray-600">
                    Subscribe to our newsletter to get updates about new products directly in your inbox.
                </p>
                <form onSubmit={handleSubscription} className="flex flex-col md:flex-row items-center gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full md:w-3/4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition"
                    >
                        Subscribe
                    </button>
                </form>
                {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
            </div>
        </section>
    );
};

export default Subscribe;