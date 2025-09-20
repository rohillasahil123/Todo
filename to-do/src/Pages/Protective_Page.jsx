import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Protective_Page = ( {children}) => {
  
  const navigate = useNavigate()
    const token = Cookies.get("token")

useEffect(()=>{
    if(!token){
      navigate("/login")
    }
})

  

  return (

    <div>
      {children}
    </div>
  )
}

export default Protective_Page
