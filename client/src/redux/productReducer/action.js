import axios from "axios"
import { GET_PRODUCT_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST } from "./actionType"

export const getProduct = () =>  (dispatch) => {
   dispatch({ type: PRODUCT_REQUEST })
   axios.get("http://localhost:4000/products")
      .then((res) => {
         dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data })
      })
      .catch((err) => {
         dispatch({ type: PRODUCT_FAILURE })
      })
} 