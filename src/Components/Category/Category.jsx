import React from 'react'
import { categoryInfo } from './categoryData'
import CategoryCard from './CategoryCard'
import classes from "../Category/category.module.css";

const Category = () => {
  return (
    <section className={classes.category_container}>
{categoryInfo.map((singleproduct)=> <CategoryCard data={singleproduct} key={singleproduct.id}/>)}
    </section>
  )
}

export default Category