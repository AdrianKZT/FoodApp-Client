
import axios from "axios";
import localforage from "localforage";

export async function getCartItem () {
    const res = await axios.get("http://localhost:5000/carts", {
        headers: {
            //"x-auth-token" : await localforage.getItem("token")
            "x-auth-token" : localStorage.getItem("token")
        }
    })
    return res.data;
}

export async function addItemToCart (food) {
    const res = await axios.post("http://localhost:5000/carts", food, {
        headers: {
            //"x-auth-token" : await localforage.getItem("token")
            "x-auth-token" :  localStorage.getItem("token")
        }
    })
    return res.data;
}

export async function deleteFromCart () {
    const res = await axios.delete("http://localhost:5000/carts", {
        headers: {
            // "x-auth-token" : await localforage.getItem("token")
            "x-auth-token" :  localStorage.getItem("token")
        }
    })
    return res.data;
}

export async function deleteItemFromCart (id) {
    const res = await axios.delete(`http://localhost:5000/carts/${id}`, {
        headers: {
            // "x-auth-token" : await localforage.getItem("token")
            "x-auth-token" : localStorage.getItem("token")
        }
    })
    return res.data;
}