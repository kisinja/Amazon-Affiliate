import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        dispatch(loginUser(userData));

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-primary/30 px-6">
            <form
                action=""
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg py-6 px-12 w-[350px] md:w-full"
            >
                <h1 className="font-semibold text-3xl mb-4">Login</h1>

                {/* Email Input */}
                <div className="mb-3 space-y-1">
                    <label htmlFor="email" className="form-label block">
                        Email
                    </label>
                    <input
                        type="email"
                        className="border-2 p-3 w-full rounded"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-3 space-y-1">
                    <label htmlFor="password" className="form-label block">
                        Password
                    </label>
                    <input
                        type="password"
                        className="border-2 p-3 w-full rounded"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>


                {/* Sign Up Link */}
                <p className="text-gray-600">
                    Don{"'"}t have an account?{' '}
                    <a href="/register" className="text-primary underline">
                        Sign up
                    </a>
                </p>

                {/* Submit Button */}
                <div className="flex justify-center items-center mt-2">
                    <button
                        type="submit"
                        className="py-2 px-5 bg-primary text-white rounded font-semibold hover:bg-primary/80"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;