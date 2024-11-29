import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
    return (
        <div className="cart-icon">
            <FaShoppingCart size={24} className='text-primary cursor-pointer' title='Add to Cart' />
        </div>
    );
};

export default CartIcon;