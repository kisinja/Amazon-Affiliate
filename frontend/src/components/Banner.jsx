

const Banner = () => {
    return (
        <section className="relative w-full h-[400px] md:h-[600px] bg-cover bg-center" style={{ background: `url('https://i.pinimg.com/736x/06/a4/86/06a48694f99adcfe63bb8261f994bb76.jpg')` }}>
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to EJ Global Shop</h1>
                <p className="text-lg md:text-xl mb-6">
                    Explore the finest home decor from around the world!
                </p>
                <button className="bg-primary px-6 py-3 text-white rounded-lg hover:bg-primary/80 transition">
                    <a href="#categories">Explore Now</a>
                </button>
            </div>
        </section>
    );
};

export default Banner
