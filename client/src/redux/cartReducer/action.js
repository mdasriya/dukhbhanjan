import axios from "axios"
import {CART_PRODUCT_FAILURE, CART_DELETE_PRODUCT_SUCCESS, CART_PRODUCT_REQUEST, CART_GET_PRODUCT_SUCCESS, CART_ADD_PRODUCT_SUCCESS } from "./actionType"

export const addCartProduct = (product) => (dispatch) => {
   console.log("action", product)
   dispatch({ type: CART_PRODUCT_REQUEST })
  return  axios.post("http://localhost:4000/cart/create", product,{
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
 })
      .then((res) => {
         console.log(res.data)
         dispatch({ Type: CART_ADD_PRODUCT_SUCCESS })
      })
      .catch(() => {
         dispatch({ type: CART_PRODUCT_FAILURE })
      })
}

export const getProduct = () => (dispatch) => {

   dispatch({ type: CART_PRODUCT_REQUEST })
   axios.get("http://localhost:4000/cart")
      .then((res) => {
         dispatch({ type: CART_GET_PRODUCT_SUCCESS, payload: res.data })
      })
      .catch((err) => {
         console.log(err)
         dispatch({ type: CART_PRODUCT_FAILURE })
      })
}


// export const editProduct = (dataobj, id) => (dispatch) => {
//    dispatch({ type: PRODUCT_REQUEST })
//   return axios.patch(`http://localhost:4000/product/${id}`, dataobj)
//       .then((res) => {
//          dispatch({ Type: EDIT_PRODUCT_SUCCESS, payload: res.data })
//       })
//       .catch(() => {
//          dispatch({ type: PRODUCT_FAILURE })
//       })
// }
 
 export const handleCartDelete = (id) => (dispatch) => {
   dispatch({type:CART_PRODUCT_REQUEST})
  return  axios.delete(`http://localhost:4000/cart/delete${id}`)
   .then((res) => {
      dispatch({type:CART_DELETE_PRODUCT_SUCCESS})
   })
   .catch((err)=> {
      dispatch({type:CART_PRODUCT_FAILURE})
   })
 }