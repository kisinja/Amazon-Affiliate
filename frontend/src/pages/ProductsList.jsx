import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import { FaToilet, FaUtensils, FaCouch, FaBed, FaTree } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [comparisonList, setComparisonList] = useState([]);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();

    const categoryIcons = {
        Bathroom: <FaToilet size={25} className="text-orange-600" />,
        Kitchen: <FaUtensils size={25} className="text-orange-600" />,
        "Living Room": <FaCouch size={25} className="text-orange-600" />,
        Bedroom: <FaBed size={20} className="text-orange-600" />,
        "Garden Supplies": <FaTree size={25} className="text-orange-600" />,
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/products`);
                if (data.success) setProducts(data.products);
            } catch (error) {
                console.error("Failed to fetch products:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [baseUrl]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/categories`);
                if (data.success) setCategories(data.categories);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchCategories();
    }, [baseUrl]);

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((product) => product.category === selectedCategory);

    const handleCompare = (product) => {
        if (comparisonList.some((item) => item._id === product._id)) {
            toast.error("This product is already in the comparison list.");
            return;
        }

        if (comparisonList.length < 4) {
            setComparisonList([...comparisonList, product]);
        } else {
            toast.error("You can compare up to 4 products only.");
        }
    };

    const clearComparisonList = () => {
        setComparisonList([]);
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="animate-ping w-12 h-12 rounded-full border-t-4 border-t-primary border-b-4 border-b-gray-200"></div>
            </div>
        );
    }

    return (
        <section className="bg-gray-100 flex">
            <aside className="w-fit md:w-[20%] bg-white py-2 px-3 shadow-md">
                <h2 className="text-lg font-bold mb-6 hidden md:inline">Categories</h2>
                <ul className="space-y-2">
                    {categories.map((cat, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer flex items-center gap-3 p-2 hover:bg-gray-100 ${selectedCategory === cat.name ? "bg-primary text-white rounded-lg" : "text-gray-700"
                                }`}
                            onClick={() => setSelectedCategory(cat.name)}
                        >
                            <span className="hidden sm:inline">{cat.name}</span>
                            <span className="sm:hidden">
                                {categoryIcons[cat.name] || <FaTree size={20} />}
                            </span>
                        </li>
                    ))}
                </ul>
            </aside>

            <div className="w-3/4 p-4 flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{selectedCategory} Products</h2>
                    {comparisonList.length > 0 && (
                        <div className="flex gap-2">
                            <button
                                onClick={clearComparisonList}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-400"
                            >
                                Clear Comparison
                            </button>
                            <button
                                onClick={() => navigate("/compare", { state: { comparisonList } })}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                            >
                                Compare Now
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} handleCompare={handleCompare} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="flex justify-center items-center">
                        <div className="text-gray-600 font-semibold p-3 rounded-lg bg-white">
                            No {selectedCategory} decor products available.
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsList;