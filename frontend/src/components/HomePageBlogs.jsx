import { Link } from "react-router-dom";
import img from '../assets/bloSection.jpeg';

const HomepageBlogs = () => {



    return (
        <section className="py-12 bg-primary text-white">
            <div className="max-w-7xl mx-auto px-10 md:px-12 lg:px-20">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Left Content */}
                    <div className="mb-8 md:mb-0 md:w-1/2">
                        <h2 className="text-4xl font-bold mb-4">Discover Our Blog</h2>
                        <p className="text-lg">
                            Stay updated with the latest articles, tutorials, and news in technology, lifestyle, and innovation.
                            Our blog section is curated to inspire, educate, and inform you.
                        </p>
                        <p className="mt-4">
                            Explore insightful content written by experts and enthusiasts alike. Dive in and stay informed!
                        </p>
                        <Link
                            to="/blog"
                            className="mt-6 inline-block bg-white text-primary py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition"
                        >
                            Visit Blog Section
                        </Link>
                    </div>

                    {/* Right Content */}
                    <div className="md:w-1/2">
                        <img
                            src={img}
                            alt="Blog preview"
                            className="w-full h-[350px] md:h-[400px] rounded-lg shadow-lg object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomepageBlogs;