import Category from "./Category";
import Products from "./Products";
import Dashboard from "./Dashboard";

const MainContent = ({ pageType }) => {
    if (pageType === 'dashboard') {
        return <Dashboard />
    }
    if (pageType === 'categories') {
        return <Category />
    }
    if (pageType === 'products') {
        return <Products />
    }
};

export default MainContent;