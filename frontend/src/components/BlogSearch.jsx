import { useState } from "react";

const BlogSearch = ({ blogs, setFilteredBlogs }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term === "") {
            setFilteredBlogs(blogs);
        } else {
            const filtered = blogs.filter((blog) =>
                blog.tags.some((tag) => tag.toLowerCase().includes(term))
            );
            setFilteredBlogs(filtered);
        }
    };

    return (
        <div className="flex items-center gap-4 mb-6">
            <input
                type="text"
                placeholder="Search by tags (e.g., technology)"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 border rounded shadow-sm"
            />
        </div>
    );
};

export default BlogSearch;