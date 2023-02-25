const express = require("express");
const cors = require('cors');
require("dotenv").config();
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const app = express();
app.use(cors())

app.post("/create-checkout-session", async (req, res) => {
  //   const session = await stripe.checkout.sessions.create({
  //     line_items: [
  //       {
  //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
  //         price_data: {
  //             currency:"usd",
  //             product_data:{
  //                 name:"T-Shirt",
  //             },
  //             unit_amount:500
  //         },
  //         quantity: 1,
  //       },
  //     ],
  //     mode: "payment",
  //     success_url: `http://www.google.com`,
  //     cancel_url: `http://www.google.com`,
  //   }); 
  console.log(req.query)
  console.log(req.body)
  console.log(req.params)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5599,
    currency: "usd",
    payment_method_types: ["card"],
  });
//   res.send({ url: session.url });
res.json({client_secret: paymentIntent.client_secret});
});
const port = 4000;
app.listen(port, () => console.log(`Running on port ${port}`));
