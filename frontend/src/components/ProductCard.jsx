import { Link } from "react-router-dom";
import { FaBalanceScale } from "react-icons/fa";
import { useState } from "react";
import { CiBookmark } from "react-icons/ci";

const ProductCard = ({ product, handleCompare }) => {

    const {
        imageUrl,
        title,
        category,
        price,
        description,
        affiliateLink,
        _id,
    } = product;

    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-[250px] md:w-full m-auto">
            {/* Image Section */}
            <Link to={`/product/${_id}`} onClick={() => scrollTo(0, 0)}>
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-[250px] object-cover"
                />
            </Link>

            {/* Details Section */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

                {/* Category */}
                <p className="text-sm text-gray-500 mb-1">{category}</p>

                {/* Price */}
                <p className="text-md font-semibold text-primary mb-3">
                    ${price.toFixed(2)}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">
                    {showFullDescription
                        ? description
                        : description.length > 80
                            ? `${description.substring(0, 77)}...`
                            : description}
                    {description.length > 80 && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowFullDescription(!showFullDescription);
                            }}
                            className="text-blue-500 hover:underline ml-1"
                        >
                            {showFullDescription ? "Show Less" : "Read More"}
                        </button>
                    )}
                </p>

                {/* Actions */}
                <div className="flex justify-between items-center">
                    {/* Compare Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the link
                            handleCompare(product);
                        }}
                        title="Add to Compare"
                        className="text-2xl text-orange-600 cursor-pointer"
                    >
                        <FaBalanceScale />
                    </button>

                    {/* Shopping Cart Icon */}
                    <CiBookmark className="text-xl text-primary cursor-pointer" title="Save for later" />
                </div>

                {/* Affiliate Link */}
                {affiliateLink && (
                    <a
                        href={affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-4 text-sm text-blue-500 hover:underline"
                    >
                        Buy Now
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProductCard;