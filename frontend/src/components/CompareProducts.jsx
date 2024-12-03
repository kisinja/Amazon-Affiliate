import { useLocation } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const CompareProducts = () => {
    const location = useLocation();
    const { comparisonList } = location.state || {};

    // Helper function to render stars for ratings
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-500 inline" />);
            } else if (halfStar && i === fullStars) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 inline" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-500 inline" />);
            }
        }
        return stars;
    };

    return (
        <div className="py-4 bg-gray-50 px-[5%]">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Compare Products</h2>
            {comparisonList?.length ? (
                <table className="min-w-full bg-white shadow-md rounded border border-gray-200 border-collapse" border="">
                    <thead className="bg-gray-100 border-b">
                        <tr className="border border-gray-300">
                            <th className="p-4 text-left font-medium text-gray-600"></th>
                            {comparisonList.map((product) => (
                                <th key={product._id} className="p-4 text-left font-medium text-gray-600">
                                    <img src={product.imageUrl} className="w-full h-20 object-cover " alt="" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Title */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700 border border-gray-300">Title</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-gray-700 border border-gray-300">{product.title}</td>
                            ))}
                        </tr>

                        {/* Description */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700 border border-gray-300">Description</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-gray-700 border border-gray-300">{product.description}</td>
                            ))}
                        </tr>

                        {/* Price */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700 border border-gray-300">Price</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-gray-700 border border-gray-300">${product.price}</td>
                            ))}
                        </tr>

                        {/* Rating */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700 border border-gray-300">Rating</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-gray-700 border border-gray-300">{renderStars(product.rating)}</td>
                            ))}
                        </tr>

                        {/* Category */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700 border border-gray-300">Category</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-gray-700 border border-gray-300">{product.category}</td>
                            ))}
                        </tr>

                        {/* Affiliate Link */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700 border border-gray-300">Affiliate Link</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-blue-600 underline border border-gray-300">
                                    <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                                        Visit
                                    </a>
                                </td>
                            ))}
                        </tr>

                        {/* Highlights */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700 border border-gray-300">Highlights</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-gray-700 border border-gray-300">
                                    {product.highlights?.length ? (
                                        <ul className="list-disc list-inside">
                                            {product.highlights.map((highlight, index) => (
                                                <li key={index}>{highlight}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                            ))}
                        </tr>

                        {/* Specifications */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700">Specifications</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-gray-700 border border-gray-300">
                                    {product.specifications ? (
                                        <ul className="list-disc list-inside">
                                            {Object.entries(product.specifications).map(([key, value], index) => (
                                                <li key={index}>
                                                    <strong>{key}:</strong> {value}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                            ))}
                        </tr>

                        {/* Featured */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700 border border-gray-300">Featured</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-gray-700 border border-gray-300">
                                    {product.featured ? "Yes" : "No"}
                                </td>
                            ))}
                        </tr>

                        {/* Timestamps */}
                        <tr className="border border-gray-300">
                            <td className="p-4 font-semibold text-gray-700 border border-gray-300">Created At</td>
                            {comparisonList.map((product) => (
                                <td key={product._id} className="p-4 text-gray-700 border border-gray-300">
                                    {new Date(product.createdAt).toLocaleString()}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No products selected for comparison.</p>
            )}
        </div>
    );
};

export default CompareProducts;