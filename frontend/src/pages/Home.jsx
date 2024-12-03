import { useEffect, useState } from "react";
import Banner from "../components/Banner"
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import axios from 'axios';
import HomepageBlogs from "../components/HomePageBlogs";
import Subscribe from "../components/Subscribe";

const Home = () => {

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const featuredProducts = products.filter(product => product.featured);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/products`);
                if (data.success) {
                    setProducts(data.products);
                    console.log(data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setMessage('Cannot get featured products at this time!!');
                }
            } catch (error) {
                console.log(error.message);
                setMessage(error.message);
            }
        };

        fetchRelatedProducts();
    }, [baseUrl]);

    return (
        <main>
            <Banner />
            <Categories />
            <FeaturedProducts featuredProducts={featuredProducts} />
            <HomepageBlogs />
            <Subscribe />
        </main>
    );
};

export default Home;