import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from '../Product/product.module.css'
import { productUrl } from '../../Api/EndPoints'
import Loader from '../Loader/Loader'
const Product = () => {
const [products,setProducts]= useState([])
const[isLoading,setIsLoading]=useState(false)
useEffect(()=>{
  setIsLoading(true)
    axios
      .get("https://fakestoreapi.com/products")

      .then((res) => {
        console.log(res);
        setProducts(res.data);
        setIsLoading(false)
      });
},[])
console.log(products);
  return (
    <>
    {
      isLoading?(<Loader/>):( <section className={classes.products_container}>
        {products?.map((singleProduct) => {
          return <ProductCard 
          renderAdd={true}
          product={singleProduct} key={singleProduct.id} />;
        })}
      </section>) 
    }
     
    </>
  );
}

export default Product