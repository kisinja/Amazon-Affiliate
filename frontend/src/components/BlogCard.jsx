import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {

    const {
        _id,
        title,
        author,
        content,
        imageUrl,
        tags,
    } = blog;

    return (
        <Link to={`/blogs/${_id}`}>
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden"
            >
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-48 w-full object-cover"
                    />
                )}
                <div className="p-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-gray-600">By {author}</p>
                    <div className="mt-2 text-sm text-gray-800 line-clamp-3">
                        {content}
                    </div>
                    <div className="mt-4 flex flex-wrap">
                        {tags?.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                            >
                                {tag.startsWith('#') ? '' : '#'}{tag}
                            </span>
                        ))}
                    </div>
                    <br />
                    <Link to={`/blogs/${_id}`} className="mt-4 text-gray-700 underline hover:text-primary hover:italic">
                        See More
                    </Link>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
