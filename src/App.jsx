import { useState } from "react";
import Header from "./componenets/layout/Header";
import Meals from "./componenets/meals/Meals";
import Cart from "./componenets/cart/Cart";
import CartProvider from "./store/CartProvider";
import { Notifications } from 'react-push-notification';

function App() {
 
  const [cartIsShow, setCartIsShow] = useState(false);

  const showCartHandler = () =>{
    setCartIsShow(true);
  }
  const hideCartHandler = () => {
    setCartIsShow(false);
  }

  return (
   <CartProvider>
    <Notifications />
    {cartIsShow && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
   </CartProvider>
  )
}

export default App
