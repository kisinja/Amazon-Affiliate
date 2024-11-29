import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const Categories = () => {

    const [categories, setCategories] = useState([]);
    const backendUrl = import.meta.env.VITE_BASE_URL;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/categories`);
                if (data.success) {
                    setCategories(data.categories);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [backendUrl]);

    if (loading) {
        return <div className='animate-ping w-12 h-12 rounded-full border-t-4 border-t-primary border-b-4 border-b-gray-200 flex justify-center items-center'></div>
    };

    return (
        <section className="py-12 bg-primary/30" id='categories'>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-100">
                Shop by Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-[5%]">
                {categories.slice(0, 4).map((category) => (
                    <div key={category._id} className="relative cursor-pointer group overflow-hidden">
                        <img
                            src={category.bannerImgUrl}
                            alt={category.name}
                            className="w-full h-40 object-cover rounded-lg shadow-md transform scale-100 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-bold rounded-lg">
                            {category.name}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;