import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// API URL
const API_URL = import.meta.env.VITE_BASE_URL;

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('authUser')) || null,
        token: localStorage.getItem('authToken') || null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
            toast.info('Logged out successfully!');
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('authToken', action.payload.token);
            state.error = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem('authUser', JSON.stringify(state.user));
        },
    },
});

// Register User
export const registerUser = (userData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${API_URL}/user/register`, userData);
        dispatch(setUser({ user: response.data.user, token: response.data.token }));

        // save user to local storage
        localStorage.setItem('authUser', JSON.stringify(response.data.user));

        // save token to local storage
        localStorage.setItem('authToken', response.data.token);

        toast.success(response.data.message);
    } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Registration failed'));
        toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
        dispatch(setLoading(false));
    }
};

// Login User
export const loginUser = (userData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${API_URL}/user/login`, userData);
        dispatch(setUser({ user: response.data.user, token: response.data.token }));

        // save user to local storage
        localStorage.setItem('authUser', JSON.stringify(response.data.user));

        // save token to local storage
        localStorage.setItem('authToken', response.data.token);

        toast.success(response.data.message);
    } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Login failed'));
        toast.error(error.response?.data?.message || 'Login failed');
    } finally {
        dispatch(setLoading(false));
    }
};

// Update User Profile
export const updateUserProfile = (profileData) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const { token } = getState().auth;

    const formData = new FormData();
    formData.append('fullName', profileData.fullName);
    formData.append('username', profileData.username);
    formData.append('email', profileData.email);

    if (profileData.profilePicture) {
        formData.append('profilePicture', profileData.profilePicture);
    }

    try {
        const response = await axios.put(`${API_URL}/user/profile`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data.success) {
            dispatch(updateUser(response.data.user)); // Update user details in Redux state
            toast.success('Profile updated successfully!');
        } else {
            throw new Error(response.data.message || 'Failed to update profile');
        }
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.message));
        toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
        dispatch(setLoading(false));
    }
};

// Reducers
export const { logout, setUser, setLoading, setError, updateUser } = authSlice.actions;
export default authSlice.reducer;