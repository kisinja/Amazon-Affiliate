import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const CreateProduct = () => {
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        affiliateLink: "",
        featured: false,
    });

    const backendUrl = import.meta.env.VITE_BASE_URL;

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData({
            ...productData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0]); // Use the first accepted file
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
        },
        multiple: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", productData.title);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("category", productData.category);
        formData.append("affiliateLink", productData.affiliateLink);
        formData.append("featured", productData.featured);

        if (image) {
            formData.append("imageUrl", image);
        }

        try {
            const { data } = await axios.post(`${backendUrl}/products`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (data.success) {
                toast.success(data.message);
                setProductData({
                    title: "",
                    description: "",
                    price: "",
                    category: "",
                    affiliateLink: "",
                    featured: false,
                });
                setImage(null);
            } else {
                toast.error(data.message?.error || "Something went wrong!");
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message || "An error occurred while creating the product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Create Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="md:w-[450px] w-full m-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded resize-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-medium mb-1">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block font-medium mb-1">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="affiliateLink" className="block font-medium mb-1">Affiliate Link</label>
                    <input
                        type="url"
                        id="affiliateLink"
                        name="affiliateLink"
                        value={productData.affiliateLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="featured" className="block font-medium mb-1">Featured</label>
                    <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={productData.featured}
                        onChange={handleChange}
                        className="ml-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Product Image</label>
                    <div
                        {...getRootProps()}
                        className={`border-dashed border-2 p-4 rounded cursor-pointer ${isDragActive ? "border-orange-600" : "border-gray-300"
                            }`}
                    >
                        <input {...getInputProps()} />
                        {image ? (
                            <p className="text-center">{image.name}</p>
                        ) : (
                            <p className="text-center">
                                Drag & drop an image here, or click to select one
                            </p>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>
        </section>
    );
};

export default CreateProduct;