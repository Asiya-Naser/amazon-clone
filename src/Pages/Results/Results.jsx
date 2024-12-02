import React,{useEffect, useState} from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import {productUrl} from '../../Api/EndPoints'
import ProductCard from '../../Components/Product/ProductCard'
import classes from '../Results/results.module.css'
import axios from 'axios'
import Loader from '../../Components/Loader/Loader'
const Results = () => {
    const [results,setResults]=useState([])
    const[isLoading,setIsLoading]=useState(false)
    const {categoryName}=useParams()
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });

  }, []);
  return (
    <LayOut>

      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{padding:"30px"}}>Category/{categoryName}</p>
        <hr/>
        {
            isLoading?(<Loader/>):( <div className={classes.products_container}>{results?.map((product)=>(<ProductCard key={product.id}
        product={product}
        productDesc={false}
        renderAdd={true}/>))}</div>)
        }
       
      </section>
    </LayOut>
  );
}

export default Results