import { Link } from "react-router-dom"
import ProductCard from "./ProductCard"

const FeaturedProducts = ({ products }) => {

    if (products.length === 0) return <div className="flex justify-center items-center text-center text-gray-600 font-semibold pt-12 text-2xl">No Featured Products Now!!</div>

    return (
        <section className="py-12 px-6 bg-orange-100">

            <center>
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-500 tracking-wider">Featured Products</h1>
            </center>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {
                    products && products.slice(0, 6).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                }
            </div>

            <div className="flex justify-center items-center mt-6">
                <button className="bg-primary p-4 rounded-full hover:bg-primary/80 text-white">
                    <Link to="/products" onClick={() => scrollTo(0, 0)}>
                        Shop More
                    </Link>
                </button>
            </div>

        </section>
    )
}

export default FeaturedProducts