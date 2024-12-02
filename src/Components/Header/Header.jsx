import React, { useContext } from 'react'
import { SlLocationPin } from "react-icons/sl"; 
import { BiCartAlt } from "react-icons/bi"; 
import { BsSearch } from "react-icons/bs";
import LowerHeader from "../Header/LowerHeader";
import classes from './header.module.css'
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../utils/firebase';
const Header = () => {
  const[{user,basket},dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0)
  return (
    <section className={classes.fixed}>
      <section>
        <section>
          <div className={classes.header_container}>
            {/* logo section*/}
            <div className={classes.logo_container}>
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon logo"
                />
              </Link>

              {/* delivery */}
              <div className={classes.delivery}>
                <span>
                  <SlLocationPin />
                </span>
                <div>
                  <p>Dlivered to</p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>

            {/* search */}
            <div className={classes.search}>
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" name="" id="" placeholder="Search Amazon" />
              <BsSearch size={38} />
            </div>
            {/* right side */}
            <div className={classes.order_container}>
              <a href="" className={classes.language}>
                <img
                  src="https://image.shutterstock.com/image-vector/official-american-flag-vector-image-260nw-1903349443.jpg"
                  alt=""
                />

                <select>
                  <option value="">EN</option>
                </select>
              </a>

              {/* three components */}
              <Link to={!user && "/auth"}>
                <div>
                  {user ? (
                    <>
                      <p>Hello, {user?.email?.split("@")[0]}</p>
                      <span onClick={()=>auth.signOut()}>Sign Out</span>
                    </>
                  ) : (
                    <> <p>Hello,Sign In</p> <span>Account & Lists</span>
                    </>
                   
                  )}
                </div>
      
              </Link>
              {/* orders */}
              <Link to="/orders">
                <p>returns</p>
                <span>& orders</span>
              </Link>
            </div>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCartAlt size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </section>
      </section>
      <LowerHeader />;
    </section>
  );
   
}

export default Header