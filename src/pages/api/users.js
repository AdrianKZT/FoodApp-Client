
import axios from "axios"
import localforage from "localforage"


export const register = async (userData) => {
    const res = await axios.post(
      "http://localhost:5000/users/register",
      userData
    );
    return res.data;
};
  

export const login = async (userData) => {
    const res = await axios.post("http://localhost:5000/users/login", userData);
    if (res.data) {
     localStorage.setItem("token", res.data);
    }
    return res.data;
};


export const logout = async () => {
    localStorage.removeItem('token')
    // await localforage.removeItem("token");
}