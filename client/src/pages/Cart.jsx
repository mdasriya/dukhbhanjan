// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const cart = () => {
// const [cartdata, setCartData] = useState([])
   
// useEffect(()=> {
//   axios.post("http://localhost:4000/cart",{
//     headers: {
//        "Content-Type": "application/json",
//        "Authorization": `Bearer ${localStorage.getItem("token")}`
//      }
//   })
//   .then((res)=>{
//     console.log(res.data)
//   })
// },[])
    
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default cart

import axios from 'axios'
import React, { useEffect } from 'react'

const Cart = () => {
useEffect(()=> {
  axios.get("http://localhost:4000/cart",{
    headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${localStorage.getItem("token")}`
     }
  })
  .then((res)=>{
    console.log(res.data)
  })
},[])

  return (
    <div>
      
    </div>
  )
}

export default Cart
