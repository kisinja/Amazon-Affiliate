const About = () => {
    return (
        <div className="container mx-auto py-8 px-10">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src="https://via.placeholder.com/300"
                    alt="About Us"
                    className="rounded-lg shadow-md"
                />
                <div>
                    <p className="text-gray-700">
                        Welcome to our affiliate app! We specialize in curating the best products to enhance your shopping experience.
                        Our team carefully selects high-quality items from Amazon to save you time and effort.
                    </p>
                    <p className="mt-4 text-gray-700">
                        As an Amazon Associate, we earn from qualifying purchases. Thank you for supporting us!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;