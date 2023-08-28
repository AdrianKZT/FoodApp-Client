
import { Button, Input } from "react-daisyui";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addItemToCart } from "../api/cart";
import localforage from "localforage";
import jwt_decode from "jwt-decode"
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

export default function FoodItem({ food }) {
  const [quantity, setQuantity] = useState(0);
  // const [auth, setAuth] = useState()
  
  const onChangeHandler = (e) => {
    setQuantity(e.target.value);
  };

  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const getToken = async() => {
  //     const token = localforage.getItem("token")
  //     if(token){
  //       setAuth(token)
  //     }
  //   }
  //   getToken()
  // }, [])

  const decoded = localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null
  // console.log(decoded)
  const { mutate } = useMutation(addItemToCart, {
    onSuccess: (data) => {
      Swal.fire("Success", data.msg, "success");
      queryClient.invalidateQueries("cart");
    },
    onError: (error) => {
      Swal.fire("Oops! Something went wrong", error.response.data.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault()
    let foodId = food._id;
    mutate({ foodId, quantity }); // Pass the quantity to the mutate function
  };

  return (
    <>
      {decoded?.data?.isAdmin && decoded ? (
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-auto">
            <form onSubmit={onSubmitHandler}>
              <div>
                <img
                  className="p-8 rounded-lg w-full h-80 object-contain"
                  src={`http://localhost:5000/${food.image.replace(
                    "public",
                    ""
                    )}`}
                    alt={food.name}
                    />
              </div>
              <div className="px-5 pb-5">
                <div>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                    {food.name}
                  </h5>
                </div>
                <div className="mb-5 text-xs">
                  <p>{food.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h5>Rm {food.price}</h5>
                </div>
              </div>
            </form>
          </div>
      ) : (
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-auto">
            <form onSubmit={onSubmitHandler}>
              <div>
                <img
                  className="p-8 rounded-lg w-full h-80 object-contain"
                  src={`http://localhost:5000/${food.image.replace(
                    "public",
                    ""
                  )}`}
                  alt={food.name}
                />
              </div>
              <div className="px-5 pb-5">
                <div>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                    {food.name}
                  </h5>
                </div>
                <div className="mb-5 text-xs">
                  <p>{food.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h5>Rm {food.price}</h5>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      className="w-16 mr-2"
                      min={1}
                      value={quantity}
                      onChange={onChangeHandler}
                    />
                    <Button
                      type="submit"
                      className="text-white bg-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      🛒
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
      )} 
    </>
  );
}


