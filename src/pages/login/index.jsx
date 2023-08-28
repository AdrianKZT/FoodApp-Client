
import { Input, Button } from "react-daisyui"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { login } from "../api/users"
import { useRouter } from "next/navigation"
import logo from "../../logo/Logo.png"
import Image from "next/image"
import Link from "next/link"
import { ThreeDots } from "react-loader-spinner"
import Swal from "sweetalert2"


export default function Login() {
    const [ user, setUser ] = useState({
        name: "",
        password: "",
    });
    //const { push } = useRouter();    
    const queryClient = useQueryClient();
    const onChangeHandler = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const { mutate, isLoading } = useMutation(login, {
        onSuccess: (data) => {
            if(!localStorage.getItem("token")){
                localStorage.setItem("token", data);
                queryClient.setQueryData("token", data)
            }
            // push("/menu")
            window.location.replace("/menu")
        },
        onError: (error) => {
            Swal.fire("Oops...", error.response.data.msg, "error");
        }
    });
    const onSubmitHandler = (e) => {
        e.preventDefault();
        mutate(user);
    }

    if(isLoading){
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

    return(
        <div className="container mx-auto my-2 px-5">
        <div className="bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <Image src={logo} alt="logo" priority={true} height={450} width={450}/>
          </div>
          <form className="flex flex-col py-6 space-y-6 md:py-0 md:px-6" onSubmit={onSubmitHandler}>
            <h5 className="text-xl font-medium text-red-600">Hello Again!</h5>
            <div>
                <label className="block text-sm font-medium text-red-600">Username</label>
                <Input
                    className="w-full"
                    type="text"
                    name="name"
                    placeholder="Please Enter Your Username"
                    onChange={onChangeHandler}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-red-600">Password</label>
                <Input
                    className="w-full"
                    type="password"
                    name="password"
                    placeholder="Please Enter Your Password"
                    onChange={onChangeHandler}
                />
            </div>
            <Button className="w-full rounded bg-transparent text-red-600 font-semibold border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 ">LOGIN</Button>

            <div className="text-sm font-medium text-gray-500">
                Not registered? <Link href="./register" className="text-red-600 hover:underline dark:text-red-600"> Create account</Link>
            </div>
          </form>
        </div>
        </div>
      </div>
    )
}