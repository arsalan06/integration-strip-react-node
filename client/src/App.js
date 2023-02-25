import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51LkPDVI1ysbNcrp1apmJMegS1kOEOWgTL10ExdL8gdu8dFXBLKjG4FgWM6DD4q7mllFfzgrOGLRZfpZJH8EeZDPP00Htl3j8ov");


function App() {
  const [clientSecret, setClientSecret] = useState("");
  const handleCheckOut = () => {
    const data={
      name:"gggg",
      total:"66666",
    }
    axios
      .post("http://localhost:4000/create-checkout-session", {data})
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data.client_secret)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  return (
    <div className="App">
         {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <button type="click" onClick={handleCheckOut}>
        Checkout
      </button>
    </div>
  );
}

export default App;
