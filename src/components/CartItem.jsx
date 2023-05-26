
//import { Mask, Table } from "react-daisyui"
import { deleteItemFromCart } from "@/pages/api/cart"
import { useMutation, useQueryClient } from "react-query"
import Swal from "sweetalert2"

export default function CartItem({ item }){

    const queryClient = useQueryClient();
    const { mutate } = useMutation(deleteItemFromCart, {
        onSuccess: (data) => {
            Swal.fire("Deleted", data.msg, "success")
            queryClient.invalidateQueries("cart")
        }, 
        onError: (error) => {
            Swal.fire("Oops!", error.response.data.msg, "error")
        }
    })

    const onDeleteOneHandler = (token) => {
        mutate(token)
    }


    return (
        <div className="">
            <div className="mx-auto justify-center md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img src={item.food.image && `http://localhost:5000/${item.food.image.replace("public", "")}`} alt={item.food.name} className="rounded" width={100}/>
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 me-5 sm:mt-0">
                                <h2 className="text-lg font-bold text-gray-900">{item.food.name}</h2>
                                <p className="mt-1 text-xs text-gray-700">{item.food.description}</p>
                                <p className="text-xs mt-5 font-semibold">RM {item.food.price}</p>
                            </div>
                            <div className="flex items-end whitespace-nowrap">
                                <p><span className="font-semibold text-red-600">Total: RM {item.subtotal}</span></p>
                            </div>
                            <div className="flex items-start">
                                <button className="hover:text-red-600 hover:underline text-xs font-semibold" onClick={() => onDeleteOneHandler(item.food._id)}>Remove</button>
                            </div>
                        </div>
                </div>
            </div>
            {/* <!-- Sub total --> */}
            
            </div>
        </div>      
    );
}