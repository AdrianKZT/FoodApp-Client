
import OrderItem from "@/components/OrderItem"
import { getOrdersByID } from "../api/order"

import { useState, useEffect } from "react"
import { getOrders } from "../api/order"
import { useQuery } from "react-query" 
import { ThreeDots } from "react-loader-spinner"
import jwt_decode from "jwt-decode"
import Moment from "react-moment"



export default function Orders() {
    //const {data, isLoading} = useQuery("order", () => getOrdersByID())

    const [auth, setAuth] = useState(null)

    const {data, isLoading} = useQuery("order", getOrders, {
        refetchOnMount: false,
    });
    
    useEffect(() => {
        const getToken = async() => {
        const token = localStorage.getItem("token")
      if(token){
        setAuth(token)
      }
    }
    getToken()
  }, [])

    
    
    if(!isLoading) console.log("data:", data)
    
    const decoded = auth ? jwt_decode(auth) : null


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

    return (
        <>
        {!decoded?.data?.isAdmin && decoded? (
        <div>
            <div>
                <div className="flex justify-center text-xl font-semibold mb-20 md:text-3xl">
                    <h2>We have received your orders!</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 flex justify-center md:grid-cols-4 md:flex md:justify-center">
                    {
                        data?.map(order => (
                            <div className="flex flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 border rounded-lg drop-shadow-lg">
                            <>
                            <h2 className="text-2xl font-semibold">Receipt
                            <span className="text-xs flex justify-end mb-2"><p>#{order._id}</p></span>
                            <span className="text-xs flex justify-end"><Moment format="DD/MM/YYYY HH:MM:SS">{order.purchased_date}</Moment></span>
                            </h2>
                            <div>
                                <ul className="flex flex-col pt-4 space-y-2">
                                    {order.items.map(item => (
                                        <li className="flex items-start justify-between">
                                            <h3>{item.food.name}
                                                <span className="text-sm "> x{item.quantity}</span>
                                            </h3>
                                            <div className="text-right">
                                                <span className="text-xs"> RM{item.food.price}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4 space-y-2">
                                <div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Subtotal</span>
                                        <span>RM{order.total}</span>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Service fee</span>
                                    <span>RM 0.00</span>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-between">
                                        <span>Total</span>
                                        <span className="font-semibold">RM{order.total}</span>
                                    </div>
                                </div>
                            </div>
                            </>
                    </div>
                    ))
                }
            </div>
        </div>
        
        ):(
        <div className="p-10">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ordered Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ordered Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ordered Date
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Action
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(order => (
                            <>
                            <tr className="bg-white border-b ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {order._id}
                                </th>
                                {order.items.map(item => (
                                    <td className="px-6 py-4">
                                        x{item.quantity}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    RM{order.total}
                                </td>
                                <td className="px-6 py-4">
                                    <Moment format="DD/MM/YYYY HH:MM:SS">{order.purchased_date}</Moment>
                                </td>
                            </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        )}
        </>
    )
}

        {/* <div>
            <div className="flex justify-center text-3xl font-semibold mb-20">
            <h2>We have received your orders!</h2>
            </div>
            </div>
            <div className="flex justify-center">
            <div className="flex flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 border rounded-lg drop-shadow-lg">
                <h2 className="text-2xl font-semibold">Receipt</h2>
                <div>
                    {!isLoading ? data.map((item, index) => <h1 key={index} >{item._id}</h1>) : <></>}
                </div>
                <div className="pt-4 space-y-2">
                    <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>RM 0.00</span>
                    </div>
                    <div className="space-y-6">
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span className="font-semibold">RM 123</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}