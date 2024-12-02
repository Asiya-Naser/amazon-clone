import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from "./product.module.css"
import {Link}  from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../utils/action.type'
const ProductCard = ({product,flex,productDesc,renderAdd}) => {
  const {image,title,price,rating,id,description}=product
  const[state,dispatch]=useContext(DataContext)
  const addToCart=()=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item:{image,title,id,rating,price,description}
    })
  }
  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="image" />
      </Link>
      <div>
      
        <h3>{title}</h3>
        {productDesc&&<div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* count */}
          <small>{rating?.count}</small>

          <div>
            {/* price */}
            <CurrencyFormat amount={price} />
          </div>
        </div>
        {
          renderAdd&&<button className={classes.button} onClick={addToCart}>
          Add to cart
        </button>
        }
        
      </div>
    </div>
  );
}

export default ProductCard