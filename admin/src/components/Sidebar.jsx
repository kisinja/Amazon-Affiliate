import { AiOutlineDashboard } from 'react-icons/ai';
import { FaBoxOpen } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

const Sidebar = ({ setPageType, pageType }) => {
    const menus = [
        {
            label: "Dashboard",
            icon: <AiOutlineDashboard className="text-xl" />,
            type: "dashboard",
        },
        {
            label: "Categories",
            icon: <MdCategory className="text-xl" />,
            type: "categories",
        },
        {
            label: "Products",
            icon: <FaBoxOpen className="text-xl" />,
            type: "products",
        },
    ];

    return (
        <aside className="w-fit md:w-1/4 bg-gray-50 border-r border-gray-200 min-h-screen p-4 sticky left-[5%]">
            <ul className="space-y-4">
                {menus.map((menu) => (
                    <li key={menu.type}>
                        <button
                            onClick={() => setPageType(menu.type)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-semibold transition ${pageType === menu.type
                                ? "bg-orange-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            title={`Visit ${menu.label}`}
                            id='sidebar-btn'
                        >
                            <span>{menu.icon}</span>
                            <span className='hidden md:inline-block'>{menu.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;