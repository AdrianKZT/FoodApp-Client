import { useState, useEffect } from "react"
import logo from "../logo/Logo.png"
import Image from "next/image"
import Link from "next/link"
//import localforage from "localforage"
import { logout } from "@/pages/api/users"
import { useRouter } from "next/navigation"
import jwt_decode from "jwt-decode"



//Navbar
export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => {
      setMenuOpen(!menuOpen)
    }

    const { push } =useRouter() 
    const [auth, setAuth] = useState(null)

   

    useEffect(() => {
      const getToken = async () => {
        const token = localStorage.getItem("token")
        if(token){
          setAuth(token)
        }
      }
      getToken()
    }, [])

    const decoded = auth ? jwt_decode(auth) : null
    

    const handleClick = () => {
      push("/login")
  }

  const logoutHandler = () => {
    logout(); 
    setAuth(null); 
    push("/")
  }

  

    return (
      <>
      {!auth ? 

      
        <nav>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
          <Image src={logo} className="ms-5" alt="Rakuzen Logo" width={60} priority={true}/>
          </Link>
            <div className="flex md:order-2">
              <button className="border border-2 p-1 me-5 rounded-lg border-red-600" onClick={handleClick}>Login</button>
              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-white focus:outline-none focus:ring-2 focus:ring-white" aria-controls="navbar-sticky" aria-expanded={menuOpen} onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              </button>
            </div>
          </div>
        </nav> : null }


        {auth && decoded?.data?.isAdmin 
          ?
        
          <nav>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/menu" className="flex items-center">
            <Image src={logo} className="ms-5" alt="Rakuzen Logo" width={60} priority={true}/>
            </Link>
            <div className="flex md:order-2">
              <button className="border border-2 p-1 me-5 rounded-lg border-red-600" onClick={logoutHandler}>Logout</button>
              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-white focus:outline-none focus:ring-2 focus:ring-white" aria-controls="navbar-sticky" aria-expanded={menuOpen} onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              </button>
            </div>
              <div className={`items-center justify-center w-full ${
                menuOpen ? "flex" : "hidden"
              } md:flex md:w-auto md:order-1`} id="navbar-sticky">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white w-full">
                {/* <li>
                <Link href="/menu" className="block py-2 pl-3 pr-4 text-white bg-red-600 rounded md:bg-transparent md:text-red-600 md:p-0">Menu Page</Link>
                </li> */}
                <li>
                <Link href="/menu" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Menu Page</Link>
                </li>
                <li>
                <Link href="../menu/create" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Create Items</Link>
                </li>
                <li>
                <Link href="../food" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Edit Items</Link>
                </li>
                <li>
                <Link href="../orders" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:p-0">View Orders</Link>
                </li>
                </ul>
                </div>
            </div>
          </nav> : null }

          {auth && !decoded.data.isAdmin ? <nav>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/menu" className="flex items-center">
          <Image src={logo} className="ms-5" alt="Rakuzen Logo" width={60} priority={true}/>
          </Link>
          <div className="flex md:order-2">
              <Link href="/cart" className="me-5 mt-1">🛒</Link>
              <button className="border border-2 p-1 me-5 rounded-lg border-red-600" onClick={logoutHandler}>Logout</button>
              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-white focus:outline-none focus:ring-2 focus:ring-white" aria-controls="navbar-sticky" aria-expanded={menuOpen} onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              </button>
          </div>
              <div className={`items-center justify-center w-full ${
                menuOpen ? "flex" : "hidden"
              } md:flex md:w-auto md:order-1`} id="navbar-sticky">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white w-full">
                  <li>
                  <Link href="./menu" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Ramen</Link>
                  </li>
                  <li>
                  <Link href="./menu" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Temaki</Link>
                  </li>
                  <li>
                  <Link href="./menu" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Gunkan</Link>
                  </li>
                  <li>
                  <Link href="./menu" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Maki</Link>
                  </li>
                  <li>
                  <Link href="/orders" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Orders</Link>
                  </li>
                </ul>
                </div>
            </div>
        </nav> : null}
      </>
    )
}
        
