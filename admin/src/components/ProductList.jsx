import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/products`);
                if (data.success) {
                    setProducts(data.products);
                }
            } catch (error) {
                toast.error(error.message);
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [backendUrl]);

    if (loading) {
        return <div className="text-gray-700">Loading...</div>
    }

    return (
        <div>
            {products && products.reverse().map((item, index) => (
                <ProductCard key={index} product={item} />
            ))}
        </div>
    )
}

export default ProductList