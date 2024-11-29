import logo from '../assets/shop-logo.png';

const Navbar = () => {
    return (
        <nav className='px-[5%] py-3 bg-white shadow-md sticky top-0 z-20 flex justify-between items-center'>
            <a href="/">
                <img src={logo} className="w-16 h-16 " />
            </a>

            <div className='flex items-center justify-between'>
                <button className="bg-red-400 text-white rounded-full py-2 px-5 hover:bg-red-500">
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
