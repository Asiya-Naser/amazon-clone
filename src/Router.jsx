import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Auth from './Pages/Auth/Auth';
import Landing
 from './Pages/Landing/Landing';
 import Payment from './Pages/Payment/Payment';
 import Order from './Pages/Order/Order';
 import Cart from './Pages/Cart/Cart';
 import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
const stripePromise = loadStripe(
  "pk_test_51QOWzBHYrQwTb5bAPwp8FybvUcztsgaS565SCdBF9ZDPINJYG189lQld3YP46TGHpm7olE7KLDNG4bVkvsQUkwE00015RwuCbG"
);
const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute msg="you must login to pay" redirect="/payments">
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute msg="you must login to see your order" redirect="/orders">
              <Order />
            </ProtectedRoute>
          }
        /> 
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:ProductId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default Routing