import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import BlogSearch from '../components/BlogSearch';
import { CiCirclePlus } from "react-icons/ci";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    const backendUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/blogs`);
                if (data.success) {
                    setBlogs(data.blogs);
                } else {
                    console.error('Unexpected response format:', data.message);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [backendUrl]);

    useEffect(() => {
        const tag = searchParams.get('tag');
        if (tag) {
            const filtered = blogs.filter((blog) =>
                blog.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
            );
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs(blogs);
        }
    }, [searchParams, blogs]);

    if (loading) {
        return <div className="text-center">Loading blogs...</div>;
    }

    return (
        <div className="container mx-auto p-4 px-8 relative">
            <h1 className="text-3xl font-bold mb-6 text-center">Blog Section</h1>

            <div className="absolute right-4 top-4 bg-primary py-2 px-3 rounded-lg cursor-pointer">
                <Link to="/publish-blog">
                    <CiCirclePlus className="text-2xl text-white" title="Publish Blog" />
                </Link>
            </div>

            <BlogSearch blogs={blogs} setFilteredBlogs={setFilteredBlogs} searchParams={searchParams} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blog;