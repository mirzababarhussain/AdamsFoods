import classes  from './Cart.module.css';
import Model from '../ui/Model'; 
import CartItem from './CartItem';
import Checkout from './Checkout';
import { useContext,useState } from 'react';
import CartContext from '../../store/cart-context';
import { RotatingLines } from "react-loader-spinner";
const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const checkOutHandler = () => {
        setIsCheckout(true);
    }
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    };
    const Loader = () => {
        return (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )
      }
    const submitOrderHandler = async (userData) => {
        setIsLoading(true);
        try {
            await fetch('https://foodapp-bdc99-default-rtdb.firebaseio.com/orders.json', {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                }),
            });
            setIsLoading(false);
            cartCtx.clearCart(); // Clear the cart after order submission
            props.onClose(); // Close the modal
        } catch (error) {
            setIsLoading(false);
            console.error('Failed to submit order:', error);
            // Optionally handle errors here
        }
      
    };
  
    const cartItem = <ul className={classes['cart-item']}>
        {cartCtx.items.map((item) => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>)}</ul>;
const ModelActions = <div className={classes.actions}>
<button className={classes['button--alt']} onClick={props.onClose}>Close</button>
{hasItems && <button className={classes.button} onClick={checkOutHandler}>Order Now</button>}
</div>;
  return (
    <Model onClose={props.onClose}>
        {isLoading ? <Loader/> : '' }
        {cartItem}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        {!isCheckout && ModelActions }
    </Model>
  )
}

export default Cart
