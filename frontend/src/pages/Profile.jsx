import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { setLoading, updateUserProfile } from "../redux/authSlice";
import { toast } from "react-toastify";
import { FaUser, FaHeart, FaEdit, FaLock } from "react-icons/fa";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(user.fullName);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [selectedFile, setSelectedFile] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [],
            "image/png": [],
            "image/gif": [],
            "image/webp": [],
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setSelectedFile(file);
                setProfilePicture(URL.createObjectURL(file));
            }
        },
    });

    const handleUpdateProfile = () => {
        dispatch(setLoading(true));

        if (!fullName || !username || !email) {
            toast.error("Please fill in all fields");
            return;
        }

        const profileData = {
            fullName,
            username,
            email,
            profilePicture: selectedFile,
        };

        dispatch(updateUserProfile(profileData));
        setIsEditing(false);
        dispatch(setLoading(false));
    };

    if (loading) {
        return (
            <div className="text-gray-500 text-xl h-screen w-full flex justify-center items-center text-center">
                Updating profile <span className="animate-bounce">...</span>
            </div>
        );
    }

    return (
        <section className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-purple-700 text-white hidden md:flex flex-col items-start py-6 px-4 space-y-6">
                <h2 className="text-xl font-bold">My Profile</h2>
                <nav className="flex flex-col space-y-4 w-full">
                    <a
                        href="/wishlist"
                        className="flex items-center space-x-4 text-lg hover:text-purple-300"
                    >
                        <FaHeart />
                        <span className="hidden md:inline">My Wishlist</span>
                    </a>
                    <a
                        href="profile"
                        className="flex items-center space-x-4 text-lg hover:text-purple-300"
                    >
                        <FaUser />
                        <span className="hidden md:inline">My Account</span>
                    </a>
                    <a
                        href="/profile"
                        className="flex items-center space-x-4 text-lg hover:text-purple-300"
                    >
                        <FaEdit />
                        <span className="hidden md:inline">Update Profile</span>
                    </a>
                    <a
                        href="/change-password"
                        className="flex items-center space-x-4 text-lg hover:text-purple-300"
                    >
                        <FaLock />
                        <span className="hidden md:inline">Change Password</span>
                    </a>
                </nav>
            </aside>

            {/* Responsive Sidebar */}
            <aside className="fixed bottom-0 left-0 w-full bg-purple-700 text-white flex md:hidden justify-around py-2">
                <a href="/wishlist" className="flex flex-col items-center">
                    <FaHeart />
                </a>
                <a href="/profile" className="flex flex-col items-center">
                    <FaUser />
                </a>
                <a href="/profile" className="flex flex-col items-center">
                    <FaEdit />
                </a>
                <a href="/change-password" className="flex flex-col items-center">
                    <FaLock />
                </a>
            </aside>

            {/* Main Profile Section */}
            <div className="flex-grow bg-purple-300 p-6">
                <h1 className="text-2xl font-bold mb-4">
                    {isEditing ? "Edit Profile" : "My Profile"}
                </h1>
                <div className="py-4 px-8 bg-white rounded-lg shadow-lg">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">
                            Profile Picture
                        </h2>
                        {isEditing ? (
                            <div
                                {...getRootProps()}
                                className="p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
                            >
                                <input {...getInputProps()} />
                                <p className="text-sm text-gray-500">
                                    Drag & drop a file here, or click to select
                                    one
                                </p>
                                {profilePicture && (
                                    <img
                                        src={profilePicture}
                                        alt="Profile Preview"
                                        className="mt-4 w-20 h-20 object-cover rounded-full"
                                    />
                                )}
                            </div>
                        ) : (
                            <img
                                src={
                                    profilePicture || "/default-profile.png"
                                }
                                alt={fullName}
                                className="w-20 h-20 object-cover rounded-full"
                            />
                        )}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">
                            Full Name
                        </h2>
                        {isEditing ? (
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                        ) : (
                            <p className="text-gray-600">{fullName}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Username</h2>
                        {isEditing ? (
                            <input
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                        ) : (
                            <p className="text-gray-600">{username}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Email</h2>
                        {isEditing ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                        ) : (
                            <p className="text-gray-600">{email}</p>
                        )}
                    </div>
                    <div className="flex justify-end gap-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleUpdateProfile}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;