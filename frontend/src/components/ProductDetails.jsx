import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/products/${id}`);

                if (data.success) {
                    setProduct(data.product);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id, baseUrl]);

    if (loading) {
        return <div className="flex justify-center items-center text-gray-600 h-screen">Loading...</div>
    }

    return (
        product ? (
            <div className="min-h-screen bg-gray-100 p-6 md:p-10">

                <center className="mb-4">
                    <h1 className="text-gray-600 text-3xl">Product Details</h1>
                </center>

                <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Product Details Wrapper */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Product Image */}
                        <div className="bg-gray-100">
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-[350px] md:h-[530px] object-cover"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                            <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
                            <p className="text-gray-600 mt-4">{product.description}</p>
                            <div className="flex items-center mt-6">
                                <span className="text-2xl font-semibold text-primary">
                                    ${product.price}
                                </span>
                                {product.featured && (
                                    <span className="ml-4 text-sm px-2 py-1 bg-otange-500 text-white rounded-md">
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Call-to-Action */}
                            <div className="mt-8">
                                <a
                                    href={product.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block w-full md:w-auto bg-primary text-white font-medium text-lg px-6 py-3 rounded-md hover:bg-primary/80 transition duration-300"
                                >
                                    Buy Now
                                </a>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-800">Product Highlights:</h3>
                                <ul className="list-disc list-inside mt-2 text-gray-600">
                                    <li>High-quality framed wall art</li>
                                    <li>Perfect for living rooms and bedrooms</li>
                                    <li>Easy to hang with included hardware</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Additional Sections */}
                    <div className="p-8 border-t mt-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why You&apos;ll Love This</h2>
                        <p className="text-gray-600">
                            Transform your walls into a gallery-worthy space with our Elegant Wall Art Set.
                            Designed for art enthusiasts, it complements any modern or traditional decor.
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="min-h-screen w-full flex justify-center items-center text-gray-600 font-semibold text-3xl">
                <p>Something went wrong.. Please try again!</p>
            </div>
        )
    );
};

export default ProductDetails;