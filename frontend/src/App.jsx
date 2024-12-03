import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import ProductDetails from './components/ProductDetails';
import Blog from './pages/Blog';
import PublishBlog from './pages/PublishBlog';
import BlogDetails from './pages/BlogDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import CompareProducts from './components/CompareProducts';

const App = () => {

  const { token } = useSelector(state => state.auth);

  return (
    <div className=''>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/compare" element={<CompareProducts />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/publish-blog" element={token ? <PublishBlog /> : <Navigate to="/login" />} />
          <Route path="/blogs/:id" element={token ? <BlogDetails /> : <Navigate to="/login" />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/product/:id" element={token ? <ProductDetails /> : <Navigate to="/login" />} />

          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;