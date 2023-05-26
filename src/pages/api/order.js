
import axios from 'axios';
import jwt_decode from "jwt-decode";


export const getOrders = async () => {
  try {
    const response = await axios.get('http://localhost:5000/orders', {
      headers: {
        "x-auth-token" : localStorage.getItem("token")
      }
    }) 
    return response.data;
  } catch (error) {
    throw new Error('Error retrieving orders');
  }
};

export const getOrdersByID = async () => {
  try{
    const user = jwt_decode(localStorage.getItem('token'))
    
    const res = await axios.get(`http://localhost:5000/orders/${user.data._id}`, {
      headers: {
        "x-auth-token": localStorage.getItem('token')
      }
    });

    console.log("api:", res.data)
    return  res.data;
  } catch (error) {
    throw new Error('Error retrieving orders');
  }
}