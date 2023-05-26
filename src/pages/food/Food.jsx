
import { Table, Mask, Button} from "react-daisyui"
import Swal from "sweetalert2"
import { useMutation, useQueryClient } from "react-query";
import { deleteFoodItem } from "../api/food";
import { useState } from "react";
import EditFoodItem from "@/components/Modal/EditFoodItem";

export default function FoodDashboard({food}) {
    const [visible, setVisible] = useState(false);
    const queryClient = useQueryClient();
    const { mutate } = useMutation(deleteFoodItem, {
        onSuccess: (data) => {
            Swal.fire("Success", data.msg, "success")
            queryClient.invalidateQueries("foods")
        },
        onError: (error) => {
            Swal.fire("Oops! Something went wrong", error.response.data.msg, "error")
        }
    });
    const onDeleteHandler = (id) => {
        mutate(id)
    }

    return (
        <Table.Row>
            <div className="flex items-center space-x-3 truncate">
                <Mask 
                    className="w-64"
                    variant="squircle"
                    src={`http://localhost:5000${food.image.replace("public","")}`} 
                    alt={food.name}
                />
            </div>

            <div className="flex">
                <div className="font-semibold">{food.name}</div>
            </div>
{/* 
            <div className="flex justify-center">
                <div className="font-medium">{food.description}</div>
            </div> */}

            <div className="flex justify-center">
              <div>RM {food.price}</div>
            </div>

            <div className="flex justify-center">
              <div>{food.category}</div>
            </div>

            
            <Button size="sm" onClick={() => setVisible(true)} className="no-underline bg-white text-black hover:text-white hover:bg-red-600"><p>Edit</p></Button>
            <EditFoodItem visible={visible} setVisible={setVisible} food={food}/>
            
            <Button size="sm" color="error" onClick={() => onDeleteHandler(food._id)} variant="outline">Delete</Button>
        </Table.Row>
    )
}


