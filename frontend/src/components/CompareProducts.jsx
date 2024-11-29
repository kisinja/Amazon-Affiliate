import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const CompareProducts = () => {
    const [comparisonList, setComparisonList] = useState([]);
    const [comparisonData, setComparisonData] = useState([]);
    const [products, setProducts] = useState([]);
    const backendUrl = import.meta.env.VITE_BASE_URL;

    const handleCompare = (product) => {
        if (comparisonList.some((id) => id === product._id)) {
            alert("This product is already in the comparison list.");
            return;
        }
        if (comparisonList.length < 4) {
            setComparisonList([...comparisonList, product._id]);
        } else {
            alert("You can compare up to 4 items only.");
        }
    };

    const fetchComparisonData = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/products/compare`, { productIds: comparisonList });

            if (data.success) {
                setComparisonData(data.products); // Assuming `products` contains the comparison data
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/products`);

                if (data.success) {
                    setProducts(data.products);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchProducts();
    }, [backendUrl]);

    return (
        <div className="p-4 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Compare Products</h2>

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} handleCompare={handleCompare} />
                ))}
            </div>

            {/* Compare Button */}
            <div className="mb-4">
                {comparisonList.length > 0 && (
                    <button
                        onClick={fetchComparisonData}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                    >
                        Compare Now
                    </button>
                )}
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
                {comparisonData.length > 0 && (
                    <table className="min-w-full bg-white shadow-md rounded border border-gray-200">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-600">Feature</th>
                                {comparisonData.map((item) => (
                                    <th key={item._id} className="text-left p-4 font-medium text-gray-600">
                                        {item.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-4 text-gray-700">Price</td>
                                {comparisonData.map((item) => (
                                    <td key={item._id} className="p-4 text-gray-700">${item.price}</td>
                                ))}
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 text-gray-700">Rating</td>
                                {comparisonData.map((item) => (
                                    <td key={item._id} className="p-4 text-gray-700">{item.rating} / 5</td>
                                ))}
                            </tr>
                            {/* Add more rows dynamically based on specifications */}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CompareProducts;