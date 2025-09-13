import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'


const SignUp_Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name , setName] = useState("")

  const navigation = useNavigate()

const handleChange = (e)=>{
  const {name , value} = e.target
  if(name ==="name"){
      setName(value)
  }
  else if(name === "email"){
    setEmail(value)
  }else if(name === "password"){
    setPassword(value)
  }
}


  const handleSign = (e) => {
      e.preventDefault()
      const signData =async ()=>{
    try {
          const result = await axios.post("http://localhost:5000/signup" , {
          name , email , password 
        })
        const data = result.data
        console.log(data , "response")
        if(data.message === "success"){
          toast.success("Registeration success")
         navigation("/login") 
        }
    } catch (error) {
      toast.error("internal error")
        console.log(error)

    }
   }
   signData()
  }


  return (
    <div className='w-full h-[90vh] items-center flex justify-center ' >
      <div className='h-[60vh] w-[34%]  shadow-2xl border flex flex-col     '>
        <div className='text-center mt-[10%]    '>
          <h1 className='text-2xl  font-extrabold p-4 '>REIGSTER HERE</h1>
        </div>
        
        <div className=' w-full flex flex-col space-y-3 justify-center items-center'>
              <input type="text" className='h-9 w-[80%] border shadow-lg px-2' placeholder='enter name' onChange={handleChange} name="name" value={name} />
          <input type="text" className='h-9 w-[80%] border shadow-lg px-2' placeholder='enter gmail' onChange={handleChange} name="email" value={email} />
          <input type="text" className='h-9 w-[80%] border shadow-lg px-2' placeholder='***********' onChange={handleChange} name="password" value={password} />
          <button
            className=' text-bold font-medium bg-blue-500 text-white h-8 w-[50%] rounded-xl hover:bg-blue-600 '
            onClick={handleSign}
          >
            Sign Up
          </button>
        </div>
           <p className='mt-7 text-center'>if you have already account so <span className='underline text-blue-600 hover:cursor-pointer'> <Link to="/login" >login</Link></span></p>
      </div>

    </div>
  )
}

export default SignUp_Page


