import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const PublishBlog = () => {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: [],
        imageUrl: null,
        published: false,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const backendUrl = import.meta.env.VITE_BASE_URL;

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const allowedExtensions = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg", "image/webp"];
            if (file && !allowedExtensions.includes(file.type)) {
                setError("Invalid file type. Please upload an image file (jpeg, jpg, png, gif, svg, webp).");
                return;
            }

            // Set the image file
            setFormData({ ...formData, imageUrl: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxFiles: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagsChange = (e) => {
        const value = e.target.value;
        const tagArray = value.split(",").map(tag => tag.trim());
        setFormData({ ...formData, tags: tagArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const blogData = new FormData();
        blogData.append("title", formData.title);
        blogData.append("content", formData.content);
        blogData.append("tags", JSON.stringify(formData.tags));
        blogData.append("published", formData.published);
        if (formData.imageUrl) {
            blogData.append("imageUrl", formData.imageUrl);
        }

        try {
            const { data } = await axios.post(`${backendUrl}/blogs`, blogData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (data.success) {
                alert("Blog published successfully");
                setFormData({
                    title: "",
                    content: "",
                    tags: [],
                    imageUrl: null,
                    published: false,
                });
                setPreviewImage(null);
                setLoading(false);
            } else {
                alert("Failed to publish blog");
                setLoading(false);
                setError(data.message);
            }
        } catch (error) {
            console.error("Error publishing blog:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center">Publishing blog...</div>;
    }

    return (
        <div className="container mx-auto py-4 px-12 bg-primary/10">
            <h1 className="text-3xl font-bold mb-6 text-center">Publish Blog</h1>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                <div className="mb-4">
                    <label htmlFor="title" className="block font-normal mb-2">
                        Blog Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block font-normal mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md resize-none"
                        rows="6"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="tags" className="block font-normal mb-2">
                        Tags (Comma-separated) i.e (tag1, tag2, tag3)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags.join(", ")}
                        onChange={handleTagsChange}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-normal mb-2">Image</label>
                    <div
                        {...getRootProps()}
                        className="w-full px-4 py-6 border-dashed border-2 border-gray-300 text-center cursor-pointer rounded-md"
                    >
                        <input {...getInputProps()} />
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className="mx-auto h-40" />
                        ) : (
                            <p>Drag & drop an image here, or click to select one.</p>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="inline-flex items-center text-gray-600">
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={(e) =>
                                setFormData({ ...formData, published: e.target.checked })
                            }
                            className="mr-2 cursor-pointer"
                        />
                        Publish Now
                    </label>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/70"
                    >
                        Publish Blog
                    </button>
                </div>

            </form>
        </div>
    )
}

export default PublishBlog