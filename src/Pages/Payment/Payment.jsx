import React, { useContext, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from "../Payment/payment.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from "../../Components/Product/ProductCard"
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { colors } from '@mui/material'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../Api/axios'
import { CircleLoader } from 'react-spinners'
import {db} from '../../utils/firebase.js'
import { useNavigate } from 'react-router-dom'
import { Type } from '../../utils/action.type.js'
const Payment = () => {
  const [{user,basket},dispatch]=useContext(DataContext )
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
   const total = basket.reduce((amount, item) => {
     return item.price * item.amount + amount;
   }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const[cardError,setcardError]=useState(null)
  const[processing,setProcessing]=useState(false)
  const navigate=useNavigate()
  const handleChange=(e)=>{
e?.error?.message? setcardError(e?.error?.message):setcardError("")
  };
  const handlePayment=async(e)=>{
e.preventDefault();
try {
  setProcessing(true);
  //step 1==backend or function --->contact to the cleint secret
  const response = await axiosInstance({
    method: "post",
    url: `/payment/create?total=${total * 100}`,
  });
  console.log(response.data);
  const clientSecret = response.data?.clientSecret;
  //step 2==client side (react side confirmation)
  const {paymentIntent}= await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
    },
  });
  //console.log(confirmation);
  //step 3==after the confirmation --->order firestore database store.then clear the basket already paid
await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
  basket:basket,
amount:paymentIntent.amount,
created:paymentIntent.created,
});
//empty the basket after payment
dispatch({type:Type.EMPTY_BASKET})
  setProcessing(false)
  navigate("/orders",{state:{msg:"you have placed new order"}})
} catch (error) {
  console.log(error);
  setProcessing(false)
}


  }
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 ReactLane</div>
            <div>Addis Ababa,Ayertena</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className='classes.loader'>
                        <CircleLoader color="grey" size={15} />
                        <p>please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment