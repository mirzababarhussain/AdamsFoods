
import classes from './AvailableMeals.module.css';
import Card from '../ui/Card';
import MealItem from './mealitems/MealItem';
import { useEffect, useState } from 'react';
// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

import { RotatingLines } from "react-loader-spinner";

import addNotification from 'react-push-notification';

  const AvailableMeals = () => {
    const [mealData, setMealData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const fetchMeals = async()=>{
        const response =  await fetch('https://foodapp-bdc99-default-rtdb.firebaseio.com/meals.json');
        const responseData = await response.json();
        console.log(responseData);
        const loadedMeals = [];
        for(const key in responseData){
          if(responseData[key]){
            loadedMeals.push({
              id:key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price
            });
          }
        
        }
        setMealData(loadedMeals);
        setIsLoading(false);
        addNotification({
          title: 'Babar Hussain Mughal',
          subtitle: 'Dev Info',
          message: 'Full Stack PHP/JS Developer',
          theme: 'red',
          native: true // when using native, your OS will handle theming.
      });
      }
      fetchMeals();
    },[])
    const mealList = mealData.map((meal) => (<MealItem key={meal.id} id={meal.id} name={meal.name} price={meal.price} description={meal.description}/>));
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
    return <section className={classes.meals}>
        <Card>
        <ul>
            {isLoading ? <Loader/> : mealList}
        </ul>
        </Card>
       
    </section>
  }

  export default AvailableMeals;