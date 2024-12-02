import React, { useContext, useState } from "react";

import classes from "../Auth/signup.module.css";
import { Link,useNavigate,useLocation} from "react-router-dom";
import { auth } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import {Type} from '../../utils/action.type'
import {CircleLoader}from"react-spinners"
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate=useNavigate()
  const navStateData=useLocation()
  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name == "sign-in") {
     
      //firebase auth
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => { 
          dispatch({ type: Type.SET_USER, user: userInfo.user });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect||"/")
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
        
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: Type.SET_USER, user: userInfo.user });
          setLoading({ ...loading, signUp: false });
           navigate(navStateData?.state?.redirect||"/");
          console.log(user);
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false }); 
        });
       
    }
  };
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/200px-Amazon_2024.svg.png"
          alt="amazon"
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg&&(<small style={{padding:"5px",textAlign:"center",color:"red",fontweight:"bold"}}>
            {navStateData?.state?.msg}
          </small>

          )
        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="sign-in"
            className={classes.login_signinbutton}
          >
            {loading.signIn ? (
              <CircleLoader color="#000" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of Use and
          Sale. Please see our Privacy Notice,our Cookies Notice and our
          Interest Based Ads Notice{" "}
        </p>
        {/* create account */}
        <button
          name="sign-up"
          type="submit"
          onClick={authHandler}
          className={classes.login_createbutton}
        >
          {loading.signUp ? (
            <CircleLoader color="#000" size={25} />
          ) : (
            "  Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
