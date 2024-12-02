import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const ShareButtons = ({ blog }) => {
    const shareUrl = window.location.href; // Current page URL
    const blogTitle = blog.title || "Check out this amazing blog!";

    // Platform-specific share URLs
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        blogTitle
    )}&url=${encodeURIComponent(shareUrl)}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
        `${blogTitle} - ${shareUrl}`
    )}`;
    const instagramShareMessage = `${blogTitle} - ${shareUrl}`;

    return (
        <div className="flex items-center gap-3">

            <span className="">
                Share this blog:
            </span>

            <div className="flex gap-4 bg-gray-100 p-2 rounded-lg">
                {/* Twitter Share */}
                <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 p-1 hover:rounded-full hover:bg-gray-300 transform transition-all duration-300"
                >
                    <FaTwitter size={24} title="Share to twitter" />
                </a>

                {/* WhatsApp Share */}
                <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700 p-1 hover:rounded-full hover:bg-gray-300 transform transition-all duration-300"
                >
                    <FaWhatsapp size={24} title="Share to WhatsApp" />
                </a>

                {/* Instagram (Copy Link) */}
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(instagramShareMessage);
                        alert("Link copied to clipboard! Share it on Instagram.");
                    }}
                    className="text-pink-500 hover:text-pink-700 p-1 hover:rounded-full hover:bg-gray-300 transform transition-all duration-300"
                >
                    <FaInstagram size={24} title="Share to Instagram" />
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;