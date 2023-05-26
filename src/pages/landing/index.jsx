
import React from 'react';
import { useRouter } from "next/router"
import logo from "../../logo/Logo.gif";
import Image from "next/image"


export default function Landing(){
    const router = useRouter()

    const handleClick = () => {
        router.push("/login")
    }


    return(
        <div className='container mx-auto font-mono'>
            <div>
                <div className='flex justify-center'>
                    <Image src={logo} alt="logo" priority={true} height={400} width={400}/>
                </div>
                <div className='flex justify-center'>
                    <button className= "m-2 p-4 rounded border-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                    onClick={handleClick}>
                        ORDER NOW
                    </button>
                </div>
            </div>
        </div>
    )
}