
import { useMutation, useQuery } from "react-query";
//import { Table, Button } from "react-daisyui"
import { getCartItem } from "../api/cart";
import CartItem from "@/components/CartItem";
import { deleteFromCart } from "../api/cart";
import Swal from "sweetalert2"
import { ThreeDots } from "react-loader-spinner"
import axios from "axios";

export default function Cart() {
    const { data, isLoading } = useQuery("cart", getCartItem, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    //console.log(data)
    
    const { mutate } = useMutation(deleteFromCart, {
        onSuccess: (data) => {
            Swal.fire("Success", data.msg, "success")
        },
        onError: (error) => {
            Swal.fire("Oops!", error.response.data.msg, "error")
        }
    })

    // const onDeleteCartHandler = (id) => {
    //     mutate(id)
    // }


    const checkOutHandler = async (e) => {
        e.preventDefault();
        // alert("Check")
        // return
        const res = await axios.post("http://localhost:5000/orders", data, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
        //console.log(res.data);
        if(res.status === 200) window.location.href = res.data
    }


    if(isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#db0808" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
        )
    }

    if( !data.items ) return <h2 className="flex justify-center text-center font-bold">Cart is Empty!</h2>


    return (
        <div className="container mx-auto pe-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto grid md:grid-cols-3 gap-4 ">

                <div className="col-span-2">
                    {data.items && data.items.map((item) => <CartItem key={item.food._id} item={item}/>)}
                </div>


                <div className="mt-6 rounded-lg border bg-white p-6 shadow-md md:mt-0">
                    <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">RM {data.total?.toFixed(2)}</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className="">
                        <p className="mb-1 text-lg font-bold text-end">RM {data.total?.toFixed(2)}</p>
                        <p className="text-sm text-gray-700">Service Tax Included</p>
                    </div>
                    </div>
                    <form onSubmit={checkOutHandler}>
                    <button className="mt-6 w-full rounded-md bg-red-500 py-1.5 font-medium text-blue-50 hover:bg-red-600">Check Out</button>
                    </form>
                </div>
            </div>
        </div>
    );
}