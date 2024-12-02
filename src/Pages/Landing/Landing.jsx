import React from 'react'
import Header from '../../Components/Header/Header'

import CarouselEffect from '../../Components/Carousel/CarouselEffect'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'
import LayOut from '../../Components/LayOut/LayOut'

const Landing = () => {
  return (
    <LayOut>
        
        <CarouselEffect/>
        <Category/>
        <Product/>
    </LayOut>
    
  )
}

export default Landing