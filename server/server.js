// const express = require("express");
// var cors = require("cors");
// const stripe = require("stripe")(
//   "sk_test_51OFC6TSB2DdCLQ7Hqs6jm6WtNJ5rhjsX0j76NN9igxtm9oWSBBtoRWMInvkWdWnqgR6fZ4w11SuSxUFQThWpfxKS00AQaN85Is"
// );



// {
//   "title": "Diamond Stone",
//   "image": "https://admin.petragems.com/api/Images/Picture117.jpg",
//   "description": "Diamonds are known for their brilliance and durability.",
//   "benefits":"Enhances inner vision and creativity.Promotes clarity and purity of thought.Boosts self-confidence and positive energy.Aids in better relationships and communication.Provides mental strength and resilience.",
//   "price": 5000,
//  "quantity":1
// }











// const app = express();
// app.use(cors());
// app.use(express.static("public"));
// app.use(express.json());

// app.post("/checkout", async (req, res) => {
//   /*
//     req.body.items
//     [
//         {
//             id: 1,
//             quantity: 3
//         }
//     ]

//     stripe wants
//     [
//         {
//             price: 1,
//             quantity: 3
//         }
//     ]
//     */

//   const items = req.body.items;
//   let lineItems = [];
//   items.forEach((item) => {
//     lineItems.push({
//       price: item.id,
//       quantity: item.quantity,
//     });
//   });

//   const session = await stripe.checkout.sessions.create({
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "http://localhost:3000/success",
//     cancel_url: "http://localhost:3000/cancel",
//   });

//   res.send(
//     JSON.stringify({
//       url: session.url,
//     })
//   );
// });

// app.listen(4000, () => console.log("Listening on port 4000!"));
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.router");
const { KundaliRouter } = require("./routes/kundali.router");
const { ProductRouter } = require("./routes/product.router");
const { CartRouter } = require("./routes/cart.router");
const { ContactRouter } = require("./routes/contact.router");
const { PaymentRouter } = require("./routes/payment");
const { OrderRouter } = require("./routes/order.router");
const { auth } = require("./middleware/auth");
const { AddressRouter } = require("./routes/address.router");
require("dotenv").config()

// const stripe = require("stripe")(
//   "sk_test_51OFC6TSB2DdCLQ7Hqs6jm6WtNJ5rhjsX0j76NN9igxtm9oWSBBtoRWMInvkWdWnqgR6fZ4w11SuSxUFQThWpfxKS00AQaN85Is"
// );
const razorpay = new Razorpay({
  key_id: "rzp_test_FZa7FJ6Bglhj8Y", // Replace with your actual key
  key_secret: "oOx40LBFhDdweDdbBHa4hLis", // Replace with your actual secret
});

// middleware section import
// Configure proxy middleware
const corsOptions = {
  origin: 'https://thedemodukhabhanjan.netlify.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
  optionsSuccessStatus: 204,
};




const app = express();
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use("/user", UserRouter)
app.use("/kundali", KundaliRouter)
app.use("/products", ProductRouter)
app.use("/cart", CartRouter)
app.use("/contact", ContactRouter)
app.use("/api/payment", auth, PaymentRouter)
app.use("/order", OrderRouter)
app.use("/address", AddressRouter)

// server home page
app.get("/", (req,res)=> {
  res.send("Welcome to dukhbhanjan server")
  })


app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  if (!Array.isArray(items)) {
    res.status(400).json({ error: "Items must be an array" });
    return;
  }



  // Collect line items as per Stripe's expectations
  const lineItems = items
    .filter((item) => item.quantity > 0) // Exclude items with quantity 0
    .map((item) => ({
      price: item.id,
      quantity: item.quantity,
    }));

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Internal Server Error");
  }
});

const port = 4000;
app.listen(port, async() => {
try {
  await connection
  console.log("database is connected")
console.log(`Server is running on http://localhost:${port}`);

} catch (error) {
  console.log(error.message)
}
 
});
