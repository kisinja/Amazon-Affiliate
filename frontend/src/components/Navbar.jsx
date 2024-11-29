import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaHamburger, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from '../assets/shop-logo.png';
import { logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="py-3 px-[5%] flex justify-between items-center bg-white shadow-md sticky top-0 z-20">
            {/* Brand Section */}
            <div className="flex gap-12 flex-1 items-center">
                <Link to="/">
                    <img src={logo} alt="Shop Logo" className="w-[60px] object-cover h-[60px] rounded-full" />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-6">
                    <li>
                        <NavLink to="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className="text-gray-600 hover:text-gray-900">
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog" className="text-gray-600 hover:text-gray-900">
                            Blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="text-gray-600 hover:text-gray-900">
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="text-gray-600 hover:text-gray-900">
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu Icon */}
            <div
                className="md:hidden cursor-pointer text-gray-600 text-2xl absolute top-3 right-[2%] z-10"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <IoMdClose /> : <FaHamburger />}
            </div>

            {/* User Section */}
            <div className="relative flex gap-6 items-center">
                {token ? (
                    <div
                        className="relative"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <div className="mr-2 md:mr-0 flex items-center gap-3">

                            <span className="hidden md:inline text-black">
                                {user?.username}
                            </span>

                            <img
                                src={user?.profilePicture}
                                alt="User"
                                className="w-[60px] h-[60px] rounded-full cursor-pointer border-4 border-primary object-fill"
                            />
                        </div>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute top-[60px] right-0 bg-red-100 shadow-lg rounded-md w-40">
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <FaUserCircle className="text-primary" /> Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <FaSignOutAlt className="text-red-600" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="text-gray-600 hover:text-gray-900">
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="absolute top-16 left-0 w-full bg-white shadow-md z-10 flex flex-col items-center gap-6 py-6 md:hidden">

                    {token && (
                        <li>
                            <NavLink
                                to="/profile"
                                className="text-gray-600 hover:text-gray-900"
                                onClick={() => setIsOpen(false)}
                            >
                                Welcome, <span className="text-orange-500">{user?.username}</span>
                            </NavLink>
                        </li>
                    )}

                    <li>
                        <NavLink
                            to="/"
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => setIsOpen(false)}
                        >
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/blog"
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </NavLink>
                    </li>
                    <li>
                        <span className="bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer" onClick={handleLogout}>
                            Logout
                        </span>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;