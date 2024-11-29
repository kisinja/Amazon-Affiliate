import { useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const Category = () => {

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        bannerImg: null,
    });
    const [loading, setLoading] = useState(false);
    const [catLoading, setCatLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/categories`);
                if (data.success) {
                    setCategories(data.categories);
                } else {
                    toast.error(data.message?.error);
                }
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            } finally {
                setCatLoading(false);
            }
        };

        fetchCategories();
    }, [backendUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prev => ({ ...prev, [name]: value }));
    };

    const handleDrop = (acceptedFiles) => {
        setNewCategory(prev => ({ ...prev, bannerImg: acceptedFiles[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);
        formData.append('bannerImgUrl', newCategory.bannerImg); // Ensure field matches backend

        try {
            const { data } = await axios.post(`${backendUrl}/categories`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data.success) {
                setCategories((prev) => [data.category, ...prev]);
                setNewCategory({ name: '', description: '', bannerImg: null });
                toast.success(data.message);
            } else {
                toast.error(data.message?.error);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="">
            <h1 className="text-2xl font-normal mb-4">Categories</h1>

            {/* New Category Form */}
            <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded shadow md:w-[500px]">
                <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Category Name"
                        value={newCategory.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Category Description"
                        value={newCategory.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded resize-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium">Banner Image</label>
                    <Dropzone onDrop={handleDrop} accept="image/*">
                        {({ getRootProps, getInputProps }) => (
                            <div
                                {...getRootProps()}
                                className="p-4 border-dashed border-2 border-gray-300 rounded cursor-pointer text-center"
                            >
                                <input {...getInputProps()} name="bannerImgUrl" />
                                {newCategory.bannerImg ? (
                                    <p>{newCategory.bannerImg.name}</p>
                                ) : (
                                    <p>Drag & drop an image, or click to select one</p>
                                )}
                            </div>
                        )}
                    </Dropzone>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </form>

            {/* Categories List */}
            <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>

            {catLoading && (
                <div className="animate-ping w-12 h-12 rounded-full border-t-4 border-t-primary border-b-4 border-b-gray-100 flex justify-center items-center"></div>
            )}

            {categories.length > 0 ? (
                <ul className="space-y-4">
                    {categories.slice(0, 3).map((category) => (
                        <li
                            key={category._id}
                            className="p-4 border rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold">{category.name}</h3>
                                <p>
                                    {category.description.length > 100
                                        ? `${category.description.slice(0, 70)}...`
                                        : category.description}
                                </p>
                            </div>
                            {category.bannerImgUrl && (
                                <img
                                    src={category.bannerImgUrl}
                                    alt={category.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No categories available.</p>
            )}
        </div>
    );
};

export default Category;