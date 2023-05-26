
import { Modal, Button, Input, FileInput } from "react-daisyui"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query";
import { updateFoodItem } from "@/pages/api/food";

import Swal from "sweetalert2"


export default function EditFoodItem({ visible, setVisible, food}) {
    const [updatedFood, setUpdatedFood] = useState({
        id: food?._id,
        name: food?.name,
        price: food?.price,
        description: food?.description,
        category: food?.category
    })

    const [image, setImage] = useState();

    const queryClient = useQueryClient()

    const { mutate } = useMutation(updateFoodItem, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("foods")
            Swal.fire(" Food Item updated successfully " , data.msg , "success")
        },
        onError: (error) => {
            Swal.fire("Oops! Something went wrong", error.response.data.msg, "error")
        }
    })

    const onChangeHandler = (e) => setUpdatedFood({ ...updatedFood, [e.target.name]: e.target.value})

    const imageHandler = (e) => setImage(e.target.files[0])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        mutate({ updatedFood, image })
    }


    return (
        <div>
            <Modal open={visible}>
                <Modal.Header className="font-bold">Edit Items</Modal.Header>
                <Modal.Body>
                    <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
                        <div>
                            <label className="block text-sm font-medium text-red-600">Name</label>
                            <Input 
                                className="w-full mb-2"
                                name="name"
                                size="sm"
                                onChange={onChangeHandler}
                                value={updatedFood.name}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-red-600">Price</label>
                            <Input 
                                className="w-full mb-2"
                                type="number"
                                name="price"
                                size="sm"
                                onChange={onChangeHandler}
                                value={updatedFood.price}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-red-600">Description</label>
                            <Input 
                                className="w-full mb-2"
                                name="description"
                                size="sm"
                                onChange={onChangeHandler}
                                value={updatedFood.description}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-red-600">Category</label>
                            <Input 
                                className="w-full mb-2"
                                name="category"
                                size="sm"
                                onChange={onChangeHandler}
                                value={updatedFood.category}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-red-600">Upload Image</label>
                            <FileInput 
                                className="w-full mb-2" 
                                name="image" 
                                bordered 
                                size="sm"
                                onChange={imageHandler}
                            />
                        </div>
                        <div className="flex justify-end mt-3">
                            <Button type="button" color="error" onClick={() => setVisible(false)}>Cancel</Button>
                            <Button color="success" className="ms-2">Confirm</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}