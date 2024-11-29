import { GrInstagram } from 'react-icons/gr';
import { FaSquareXTwitter } from 'react-icons/fa6';

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-300 py-6 px-[5%]">

            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg text-gray-700 underline">Useful Links</h3>
                    <ul>
                        <li><a href="/" className="text-gray-500 hover:text-black">Home</a></li>
                        <li><a href="/about" className="text-gray-500 hover:text-black">About Us</a></li>
                        <li><a href="/contact" className="text-gray-500 hover:text-black">Contact Us</a></li>
                        <li><a href="/privacy-policy" className="text-gray-500 hover:text-black">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg text-gray-700 underline">Follow Us</h3>
                    <ul className='flex flex-col gap-2 items-center'>
                        <li><a href="https://www.instagram.com" className="text-gray-500 hover:text-black">
                            <GrInstagram className='text-xl' />
                        </a></li>
                        <li><a href="https://www.youtube.com" className="text-gray-500 hover:text-black">
                            <FaSquareXTwitter className='text-xl' />
                        </a></li>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-3">
                <p className="text-sm tracking-wider text-gray-400">&copy;CopyRight {year} EJ Global Shop</p>
            </div>
        </footer>
    );
};

export default Footer