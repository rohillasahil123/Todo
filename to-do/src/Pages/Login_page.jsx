import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"


const Login_page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }


  const handleLogin = (e) => {
    e.preventDefault()
    const LoginData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email, password
        })
        if (response.status === 200) {
          toast.success("login")
          navigate("/")
          setEmail("")
          setPassword("")
        }
      } catch (error) {
        toast.error("internal error")
      }
    }

    LoginData()

  }


  return (
    <div className='w-full h-[90vh] items-center flex justify-center ' >
      <div className='h-[60vh] w-[34%]  shadow-2xl border flex flex-col     '>
        <div className='text-center mt-[10%]    '>
          <h1 className='text-2xl  font-extrabold p-4 '>LOGIN HERE</h1>
        </div>
        <div className=' w-full flex flex-col space-y-3 justify-center items-center'>
          <input type="text" className='h-9 w-[80%] border shadow-lg px-2' placeholder='enter gmail' onChange={handleChange} name="email" value={email} />
          <input type="text" className='h-9 w-[80%] border shadow-lg px-2' placeholder='***********' onChange={handleChange} name="password" value={password} />
          <button
            className=' text-bold font-medium bg-blue-500 text-white h-8 w-[50%] rounded-xl hover:bg-blue-600 '
            onClick={handleLogin}
          >
            LOGIN
          </button>
        </div>
        <p className='mt-7 text-center'>if you have no account so please <span className='underline text-blue-600 hover:cursor-pointer'> <Link to="/sign" >register</Link></span></p>
      </div>

    </div>
  )
}

export default Login_page
