import logo from '../assets/shop-logo.png';
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
    return (
        <nav className='px-[5%] py-3 bg-white shadow-md sticky top-0 z-20 flex justify-between items-center'>
            <a href="/">
                <img src={logo} className="w-16 h-16 rounded-full object-cover" />
            </a>

            <div className='flex items-center justify-between'>
                <FiLogOut size={24} className='cursor-pointer text-red-600' title="logout" />
            </div>
        </nav>
    )
}

export default Navbar
