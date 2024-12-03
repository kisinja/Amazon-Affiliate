import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../redux/wishListSlice";
import { FaTrashAlt } from "react-icons/fa";

const WishList = () => {

    const {wishList} = useSelector(state => state.wishList);
    const dispatch = useDispatch();

    const handleRemoveFromWishList = (productId) => {
        dispatch(removeFromWishList(productId));
    };

    return (
        <section className="bg-blue-100 min-h-screen py-4 px-[5%]">
            <h1 className="text-center text-3xl font-normal text-gray-800 mb-6">
                My Wishlist
            </h1>

            {
                Array.isArray(wishList) && wishList.length === 0 ? (
                    <div className="bg-white py-4 px-6 rounded-lg text-center flex flex-col justify-center items-center">
                        <p className="text-center text-gray-600">Your wishlist is currently empty!</p>
                        <p className="text-gray-700">
                            Visit the <a href="/products" className="text-primary">products page</a> and add products to your wishlist to buy later.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            Array.isArray(wishList) && wishList.map(item => (
                                <div
                                    key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-[200px] object-cover"
                                    />

                                    <div className="p-4">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            {item.title}
                                        </h2>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Category: {item.category}
                                        </p>

                                        <p className="text-gray-600 mt-4">
                                            {item.description}
                                        </p>

                                        <div
                                            className="flex items-center justify-between mt-6"
                                        >
                                            <span className="text-2xl font-semibold text-primary">
                                                ${item.price}
                                            </span>

                                            <button
                                                onClick={() => handleRemoveFromWishList(item._id)}
                                                className="px-4 py-1 bg-red-500 text-white rounded-md"
                                            >
                                                <FaTrashAlt
                                                    className="text-lg"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </section>
    );
};

export default WishList;