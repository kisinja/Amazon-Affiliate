import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/blogs/${id}`);
                if (data.success) {
                    setBlog(data.blog);
                } else {
                    setError(data.message);
                    setBlog({});
                }
            } catch (error) {
                setError('Error fetching blog details.');
                console.error('Error fetching blog:', error.message);
                setBlog({});
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [backendUrl, id]);

    if (loading) {
        return <div className="text-center">Loading blog details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <section className="py-8 px-6 bg-orange-100">
            {/* Blog Title and Description */}
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-2">Blog Details</h1>
                <p className="text-xl text-center mb-8">
                    You are viewing the blog with ID: <span className="font-semibold">{id}</span>
                </p>

                {/* Blog Content Area */}
                <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
                    {/* <p className="text-lg text-gray-700 mb-6">{blog.excerpt}</p> */}

                    <div className="text-gray-700 text-sm space-x-3 mb-6">
                        <span className="inline-block">By <span className="font-semibold">{blog.author}</span></span>
                        <span className="inline-block">
                            Posted on{" "}
                            <span className="font-semibold">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                        </span>
                    </div>

                    {/* Blog Image */}
                    <div className="mb-6">
                        <img
                            src={blog.imageUrl || "https://via.placeholder.com/800x400"}
                            alt="Blog Image"
                            className="w-full h-72 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">Blog Content</h3>
                        <p className="text-lg text-gray-700">{blog.content}</p>
                    </div>

                    {/* Tags Section */}
                    <div className="mt-8">
                        <h4 className="text-xl font-semibold mb-3">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags?.map((tag, index) => (
                                <Link
                                    to={`/blogs?tag=${encodeURIComponent(tag)}`}
                                    key={index}
                                    className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-orange-700 transition"
                                >
                                    {tag.startsWith('#') ? '' : '#'}{tag}
                                </Link>
                            ))}
                        </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="mt-8 text-center">
                        <button className="bg-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-primary-dark transition">
                            Share This Blog
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;