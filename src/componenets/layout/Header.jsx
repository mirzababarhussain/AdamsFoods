
import { Fragment } from 'react'

import mealImage from '../../assets/meals.jpg';

import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
            <header className={classes.header}>
                <h1>Mughal Meals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealImage} alt="logo" />
            </div>
    </Fragment>
  )
}

export default Header
