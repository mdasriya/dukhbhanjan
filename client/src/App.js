// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Nav from "./Nav";
import Footer from "./Footer";
import AboutUs from "./components/AboutUs";
import SignUp from "./components/SignUp";
import MyCart from "./components/MyCart";
import "aos/dist/aos.css";
import AOS from "aos";
import Login from "./components/Login";
import Gemstones from "./components/Gemstones";
import Kundali from "./components/Kundali";
import ReadMore from "./components/ReadMore";
import WorkshipItems from "./components/WorkshipItems";
import Yantra from "./components/Yantra";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import PrivateRoutes from "./components/privateRoutes";
import Profile from "./pages/Profile";
import Oderse from "./pages/Oderse";
import SingleProduct from "./components/SingleProduct";
import Cart from "./pages/Cart";
AOS.init({
  duration: 1200,
});

function App() {
  // const [user, setUser] = useState(null);

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="gemstones" element={<Gemstones />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutUs />} />
          <Route
            path="signup"
            element={<SignUp />} // Pass setUser to SignUp
          />
          <Route
            path="login"
            element={<Login />} // Pass setUser to Login
          />
          <Route path="cart" element={<PrivateRoutes><MyCart /></PrivateRoutes>} />
          <Route path="kundali" element={<PrivateRoutes><Kundali /></PrivateRoutes>} />
          <Route path="readmore" element={<ReadMore />} />
          <Route path="workshipitems" element={<WorkshipItems />} />
          <Route path="yantra" element={<Yantra />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
          <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
          <Route path="/orders" element={<Oderse />} />
          <Route path="/newcart" element={<Cart />} />
          <Route path="/gemstones/:id" element={<SingleProduct />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
