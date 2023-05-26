import { Input, Button } from "react-daisyui"
import { useState } from "react"
import Swal from "sweetalert2"
import { register } from "../api/users"
import { useMutation } from "react-query"
import {useRouter} from "next/navigation"
import { ThreeDots } from "react-loader-spinner"


export default function Register() {
    const [user, setUser ] = useState({})
    const { push } = useRouter()
    const onChangeHandler = (e) => setUser({ ...user, [e.target.name]: e.target.value})
    const { mutate, isLoading } = useMutation(register, {
        onSuccess: (data) => {
            Swal.fire({
                title: "Register Successfully",
                text: data.msg,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Good to go!",
            }).then((res) => {
                if( res.isConfirmed) push("/login")
            })
        },
        onError: (error) => {
            Swal.fire("Failed to register !", error.response.data.msg, "error")
        }
    })
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(user.password !== user.password2)
            Swal.fire(
                "Oops...", "Password and Confirm Password should match", "error"
            )
        mutate(user)
    };

    if(isLoading) {
      return(
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
      <div className="container mx-auto my-5 px-5">
        <div className="bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-2xl font-bold mb-6">Welcome To <span className="text-red-600">RAKUZEN</span></h1>
            <div className="space-y-4">
            <p>
              <span className="text-red-600 font-bold">RAKUZEN</span> beautifully evokes the meaning of <span className="italic font-semibold">‘joy of dining’</span> or simply <span className="italic font-semibold">‘happy dining’</span> in Japanese.
              <br />
              Come on a delightful dining journey with us, savour our specially curated selection of popular Japanese cuisine peppered with a dash of eclectic South East Asian street food.
              <br/>
              Using the best available ingredients, our passionate chefs tap on decades of rich culinary experience in the Far East to create an authentic and superior meal experience for you.
              <br/>
              Whether you yearn for the familiar tastes of Japan or seek fresh exciting flavours for your palate, Rakuzen is the place to be.
              Happy Dining at Rakuzen Ramen And Sushi.
              <br/>
              <span className="font-semibold italic">Itadakimasu!</span>
              </p>
            </div>
          </div>
          <form className="flex flex-col py-6 space-y-6 md:py-0 md:px-6" onSubmit={onSubmitHandler}>
            <h5 className="text-xl font-medium text-red-600">Fill Up Your Info!</h5>
            <div>
              <label className="block text-sm font-medium text-red-600">Name</label>
              <Input
                className="w-full"
                type="text"
                placeholder="Please Enter Your Name"
                name="name"
                size="sm"
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600">Email</label>
              <Input
                className="w-full"
                type="email"
                placeholder="Please Enter Your Email"
                name="email"
                size="sm"
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600">Password</label>
              <Input
                className="w-full"
                type="password"
                placeholder="Please Enter Your Password"
                name="password"
                size="sm"
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600">Confirm Password</label>
              <Input
                className="w-full"
                type="password"
                placeholder="Please Confirm Your Password"
                name="password2"
                size="sm"
                onChange={onChangeHandler}
              />
            </div>
            <Button className="w-full rounded bg-transparent text-red-600 font-semibold border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 ">Register</Button>
            <div className="text-sm font-medium text-gray-500">Have An Account? <a href="./login" className="text-red-600 hover:underline dark:text-red-600"> Login Now</a>
            </div>
          </form>
        </div>
        </div>
      </div>





      // <div className="container px-8">
      //     <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            
      //         <div className="relative overflow-hidden md:flex w-1/2 justify-around items-center hidden">
      //             <p>
      //               <span className="text-red-600 font-bold">RAKUZEN</span> beautifully evokes the meaning of <span className="italic font-semibold">‘joy of dining’</span> or simply <span className="italic font-semibold">‘happy dining’</span> in Japanese.
      //               <br />
      //               Come on a delightful dining journey with us, savour our specially curated selection of popular Japanese cuisine peppered with a dash of eclectic South East Asian street food.
      //               <br/>
      //               Using the best available ingredients, our passionate chefs tap on decades of rich culinary experience in the Far East to create an authentic and superior meal experience for you.
      //               <br/>
      //               Whether you yearn for the familiar tastes of Japan or seek fresh exciting flavours for your palate, Rakuzen is the place to be.
      //               Happy Dining at Rakuzen Ramen And Sushi.
      //               <br/>
      //               <span className="font-semibold italic">Itadakimasu!</span>
      //             </p>
      //         </div>



      //         <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
      //             <form>
      //             <div className="">
      //                 <Input
      //                   className=""
      //                   type="text"
      //                   placeholder="Full Name"
      //                   name="name"
      //                   onChange={onChangeHandler}
      //                 />
      //               </div>
      //               <div className="">
      //                 <Input
      //                   className=""
      //                   type="text"
      //                   placeholder="Username"
      //                   name="username"
      //                   onChange={onChangeHandler}
      //                 />
      //               </div>
      //               <div className="">
      //                 <Input
      //                   className=""
      //                   type="email"
      //                   placeholder="Email"
      //                   name="email"
      //                   onChange={onChangeHandler}
      //                 />
      //               </div>
      //               <div className="">
      //                 <Input
      //                   className="w-full"
      //                   type="password"
      //                   placeholder="Password"
      //                   name="password"
      //                   onChange={onChangeHandler}
      //                 />
      //               </div>
      //               <div className="">
      //                 <Input
      //                   className="w-full"
      //                   type="password"
      //                   placeholder="Confirm Password"
      //                   name="password2"
      //                   onChange={onChangeHandler}
      //                 />
      //               </div>
      //               <Button className="block w-full">Register</Button>
      //             </form>
      //         </div>
      //     </div>
      // </div>
    )
}