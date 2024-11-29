import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";

const Register = () => {

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.auth);

    const register = async (e) => {
        e.preventDefault();

        const userData = {
            fullName,
            username,
            email,
            password
        }

        dispatch(registerUser(userData));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-primary/30">

            <form action="" onSubmit={register} className="bg-white shadow-lg rounded-lg py-6 px-12 w-[450px]">

                <h1 className="font-semibold text-3xl mb-4">Register</h1>

                <div className="mb-3 space-y-1">
                    <label htmlFor="fullName" className="form-label block ">Full Name</label>
                    <input type="text" className="border-2 p-3 w-full rounded" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" />
                </div>

                <div className="mb-3 space-y-1">
                    <label htmlFor="username" className="form-label block ">Username</label>
                    <input type="text" className="border-2 p-3 w-full rounded" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                </div>

                <div className="mb-3 space-y-1">
                    <label htmlFor="email" className="form-label block ">Email</label>
                    <input type="email" className="border-2 p-3 w-full rounded" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </div>

                <div className="mb-3 space-y-1">
                    <label htmlFor="password" className="form-label block ">Password</label>
                    <input type="password" className="border-2 p-3 w-full rounded" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <p className="text-gray-600">
                    Already have an account? <a href="/login" className="text-primary underline">Sign in</a>
                </p>

                <div className="flex justify-center items-center mt-2">
                    <button type="submit" className="py-2 px-5 bg-primary text-white rounded font-semibold hover:bg-primary/80" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;