
import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';

import CartIcon from '../cart/CartIcon';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
const cartCtx = useContext(CartContext);
const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
  return curNumber + item.amount;
},0);

const [btnIsHighlighted, setBtnIsHiglighted] =  useState(false);

const {items} = cartCtx;

const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

useEffect(() =>{
  if(items.length === 0){
    return ;
  }
  setBtnIsHiglighted(true);
  const timer = setTimeout(() => {
    setBtnIsHiglighted(false);
  },300);
  return () => {
    clearTimeout(timer);
  }
},[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>

    <span className={classes.icon}>
        <CartIcon/>
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>

    </button>
  )
}

export default HeaderCartButton
