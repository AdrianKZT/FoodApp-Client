import { Input, Button, FileInput } from "react-daisyui";

import { useState } from "react";
import { useMutation } from "react-query";
import { addFoodItem } from "@/pages/api/food";
import Swal from "sweetalert2"
import Image from "next/image"
import sushi from "../../../logo/sushi-istock.gif"


export default function addFoodItemForm() {
    const [ foodProduct, setFoodProduct ] = useState({})
    const [image , setImage ] = useState();
    const onChangeHandler = (e) => setFoodProduct({...foodProduct, [e.target.name]: e.target.value})
    const imageHandler = (e) => setImage(e.target.files[0])

    const { mutate } = useMutation(
        ({ foodProduct, image}) => addFoodItem(foodProduct, image),
        {
            onSuccess: (data) => {
                Swal.fire("Success", data.msg, "success")
            },
            onError: (error) => {
                Swal.fire("Oops..", error.response.data.msg, "error")
            }
        }
    );

    const onSubmitHandler = (e) => {
        e.preventDefault()
        mutate({ foodProduct, image })
    }


    return (
        <div className="container mx-auto my-5">
        <div className="bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6 flex">
            <Image src={sushi} alt="logo" priority={true} height={500} width={500} className="rounded-lg"/>
          </div>
          <form className="flex flex-col py-6 space-y-6 md:py-0 md:px-6" onSubmit={onSubmitHandler}>
            <h5 className="text-xl font-medium text-red-600">Create A New Menu</h5>
            <div>
                <label className="block text-sm font-medium text-red-600">Enter Dish Name</label>
                <Input 
                    className="w-full"
                    placeholder=""
                    name="name"
                    size="sm"
                    onChange={onChangeHandler}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-red-600">Enter Price</label>
                <Input 
                    className="w-full"
                    placeholder=""
                    name="price"
                    type="number"
                    size="sm"
                    onChange={onChangeHandler}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-red-600">Enter Description</label>
                <Input 
                    className="w-full"
                    placeholder=""
                    name="description"
                    size="sm"
                    onChange={onChangeHandler}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-red-600">Enter Category</label>
                <Input 
                    className="w-full"
                    placeholder=""
                    name="category"
                    size="sm"
                    onChange={onChangeHandler}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-red-600">Upload Image</label>
                <FileInput 
                    className="w-full"
                    placeholder=""
                    name="image"
                    size="sm"
                    bordered
                    onChange={imageHandler}
                />
            </div>
            <Button className="w-full rounded bg-transparent text-red-600 font-semibold border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                Add Items
            </Button>
          </form>
        </div>
        </div>
      </div>
    )
}