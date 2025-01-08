import Category from "./Category";
import Products from "./Products";
import Dashboard from "./Dashboard";
import ProductList from "./ProductList";

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
    if (pageType === 'all-products') {
        return <ProductList />
    }
};

export default MainContent;