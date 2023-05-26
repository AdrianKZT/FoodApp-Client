
import axios from "axios"
// import localforage from "localforage"


export const getFoodItem = async () => {
    const res = await axios.get("http://localhost:5000/foods")
    return res.data;
}


export const addFoodItem = async ( food, image ) => {
    const formData = new FormData();
    formData.append("name", food.name)
    formData.append("price", food.price)
    formData.append("description", food.description)
    formData.append("category", food.category)
    formData.append("image", image)

    const res = await axios.post("http://localhost:5000/foods", formData, {
        headers: {
            "x-auth-token" : localStorage.getItem("token")
        }
    })
    return res.data
}


export const deleteFoodItem = async ( id ) => {
    const token = localStorage.getItem("token")
    const res = await axios.delete(`http://localhost:5000/foods/${id}`, {
        headers: {
            "x-auth-token" : token
        }
    })
    return res.data
}


export const updateFoodItem = async ( food ) => {
    
    const token =  localStorage.getItem("token")
    let formData = new FormData();
    formData.append("name", food.updatedFood.name)
    formData.append("price", food.updatedFood.price)
    formData.append("description", food.updatedFood.description)
    formData.append("category", food.updatedFood.category)
    formData.append("image", food.image)

    const res = await axios.put(`http://localhost:5000/foods/${food.updatedFood.id}`, formData, {
        headers: {
            "x-auth-token" : token
        }
    })
    return res.data;
}