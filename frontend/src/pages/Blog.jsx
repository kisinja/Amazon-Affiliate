import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { CiCirclePlus } from "react-icons/ci";
import BlogSearch from '../components/BlogSearch';

const Blog = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BASE_URL;

    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/blogs`);
                if (data.success) {
                    setBlogs(data.blogs);
                } else {
                    console.error('Unexpected response format:', data.message);
                    setBlogs([]);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [backendUrl]);

    if (loading) {
        return <div className="text-center">Loading blogs...</div>;
    }

    return blogs.length !== 0 ? (
        <div className="container mx-auto p-4 px-8 relative">
            <h1 className="text-3xl font-bold mb-6 text-center">Blog Section</h1>

            <div className='absolute right-4 top-4 bg-primary py-2 px-3 rounded-lg cursor-pointer focus:bg-white'>
                <Link to="/publish-blog" className=''>
                    <CiCirclePlus className='text-2xl text-white' title='Publish Blog' />
                </Link>
            </div>

            <BlogSearch blogs={blogs} setFilteredBlogs={setFilteredBlogs} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs && blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </div>
    ) : (
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Our Blog</h1>
            <p>No blogs found.</p>

            <Link to="/publish-blog">
                <button className="mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded px-4 py-2">
                    Create a blog
                </button>
            </Link>
        </div>
    );
};

export default Blog;