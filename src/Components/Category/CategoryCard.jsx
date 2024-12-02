import React from 'react'
// import categoryInfo from'./categoryData'
import classes from "../Category/category.module.css";
import { Link } from 'react-router-dom';
const CategoryCard = ({data}) => {
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imageLink} alt="image" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard