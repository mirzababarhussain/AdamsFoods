
import { useRef, useState } from 'react';
import classes from './Checkout.module.css';
const isEmpty = value => value.trim()=== '';
const isFiveChar = value => value.trim().length === 5;


const Checkout = (props) => {

    const [formInputsValdity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode:true
    });

    const nameInputRef = useRef();  
    const streetInputRef = useRef();  
    const postcodeInputRef = useRef();  
    const cityInputRef = useRef(); 

    const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostcode = postcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const validName = !isEmpty(enteredName);
    const validStreet = !isEmpty(enteredStreet);
    const validCity = !isEmpty(enteredCity);
    const validPostcode = isFiveChar(enteredPostcode);

    setFormInputValidity({
        name: validName,
        street: validStreet,
        city: validCity,
        postalCode: validPostcode
    });

    const formIsValid = validName && validStreet && validCity && validPostcode;

    if(!formIsValid){
        return;
    }

    // Submit Data fo Firebase Server.
    props.onConfirm({
       name: enteredName,
       street:enteredStreet,
       city: enteredCity,
       postalCode: enteredPostcode

    });

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValdity.name && <p>Please enter Your Name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValdity.street && <p>Please enter Your Street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postcodeInputRef} />
        {!formInputsValdity.postalCode && <p>Please enter Postal Code</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValdity.city && <p>Please enter Your City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;