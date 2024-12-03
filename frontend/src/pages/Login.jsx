import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                className="bg-white shadow-lg rounded-lg py-6 px-12 w-[350px] md:w-[450px] m-auto"
            >
                <h1 className="font-semibold text-2xl md:text-3xl mb-4">Login</h1>

                {/* Email Input */}
                <div className="mb-3 space-y-1">
                    <label htmlFor="email" className="form-label block text-lg text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        className="border-2 p-3 w-full rounded"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        readOnly={isLoading}
                    />
                </div>

                {/* Password Input */}
                <div className="mb-3 space-y-1">
                    <label htmlFor="password" className="form-label block text-lg text-gray-700">
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            className="border-2 p-3 w-full rounded"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            readOnly={isLoading}
                        />
                        <span className='bg-orange-500 text-white p-2 rounded-lg absolute right-3 top-1.5 cursor-pointer' title={`${showPassword ? 'Hide Password' : 'Show Password'}`} onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? "Hide" : "Show"
                            }
                        </span>
                    </div>
                </div>


                {/* Sign Up Link */}
                <p className="text-gray-600 text-sm">
                    Don{"'"}t have an account?{' '}
                    <a href="/register" className="text-primary underline">
                        Sign up
                    </a>
                </p>

                <p className="text-gray-600 text-sm mt-1">
                    Forgot your Password?{' '}
                    <a href="#" className="text-primary underline">
                        Click here to reset
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