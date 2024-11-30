
import { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../ui/Input';
const MealitemForm = (props) => {
  const [amountIsValid, setAmountIsValid] =  useState(true);
  const amountInpuRef = useRef();
  
  const submitHanlder = event =>{
    event.preventDefault();
    const enteredAmount = amountInpuRef.current.value;
    const enteredAmountNumner = +enteredAmount;
    if(enteredAmount.trim().length === 0 || enteredAmountNumner < 1 || enteredAmountNumner > 5){
      setAmountIsValid(false);
      return ;
    }
    props.onAddToCart(enteredAmountNumner);
  }
  return (
    <form className={classes.form} onSubmit={submitHanlder}>
        <Input 
            ref={amountInpuRef}
            label="Amount" input={{

            id: "amount",
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1"

        }}/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter amount 1 to 5</p>}
    </form>
  )
}

export default MealitemForm