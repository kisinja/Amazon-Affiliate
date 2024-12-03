import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";

const Register = () => {

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.auth);

    const register = async (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
            alert("Passwords don't match!")
            return;
        };

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

            <form action="" onSubmit={register} className="bg-white shadow-lg rounded-lg py-6 px-12 md:w-[450px] m-auto w-[350px]">

                <h1 className="font-semibold text-3xl mb-4">Register</h1>

                <div className="mb-3 space-y-1">
                    <label htmlFor="fullName" className="form-label block text-lg text-gray-700">Full Name</label>
                    <input type="text" className="border-2 p-3 w-full rounded" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" />
                </div>

                <div className="mb-3 space-y-1">
                    <label htmlFor="username" className="form-label block text-lg text-gray-700">Username</label>
                    <input type="text" className="border-2 p-3 w-full rounded" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                </div>

                <div className="mb-3 space-y-1">
                    <label htmlFor="email" className="form-label block text-lg text-gray-700">Email</label>
                    <input type="email" className="border-2 p-3 w-full rounded" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </div>

                <div className="mb-3 space-y-1">
                    <label htmlFor="password" className="form-label block text-lg text-gray-700">Password</label>
                    <div className="relative">
                        <input type={`${showPassword ? 'text' : 'password'}`} className="border-2 p-3 w-full rounded" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                        <span className='bg-orange-500 text-white p-2 rounded-lg absolute right-3 top-1.5 cursor-pointer' title={`${showPassword ? 'Hide Password' : 'Show Password'}`} onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? "Hide" : "Show"
                            }
                        </span>
                    </div>
                </div>
                <div className="mb-3 space-y-1">
                    <label htmlFor="password" className="form-label block text-lg text-gray-700">Confirm Password</label>
                    <div className="relative">
                        <input type={`${showPassword ? 'text' : 'password'}`} className="border-2 p-3 w-full rounded" id="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter your password" />
                        <span className='bg-orange-500 text-white p-2 rounded-lg absolute right-3 top-1.5 cursor-pointer' title={`${showPassword ? 'Hide Password' : 'Show Password'}`} onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? "Hide" : "Show"
                            }
                        </span>
                    </div>
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