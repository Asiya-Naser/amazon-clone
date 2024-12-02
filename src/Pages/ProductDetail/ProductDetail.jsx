import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../Api/EndPoints'
import LayOut from '../../Components/LayOut/LayOut'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'
import classes from '../ProductDetail/ProductDetail.module.css'
const ProductDetail = () => {
    const{ProductId}= useParams()
    const[product,setProduct]=useState([])
    const[isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        setIsLoading(true)
        axios.get(`${productUrl}/products/${ProductId}`).then((res)=>{
          setProduct(res.data) 
          setIsLoading(false) 
        }).catch((err)=>{
            console.log(err);
            setIsLoading(false)
        })}
    ,[])
  return (
    <LayOut>
        {isLoading?(<Loader/>):(<ProductCard  product={product}
        flex={true}
        productDesc={true}
        renderAdd={true}/>)}
        </LayOut>
  )
}

export default ProductDetail