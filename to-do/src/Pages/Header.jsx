import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import { MdOutlineMenu } from "react-icons/md"
import Cookies from 'js-cookie';

const Header = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const navigation = useNavigate()

  const handleOpen = () => {
    setIsMobileView(!isMobileView);
  }

  const handleLogout = ()=>{
    Cookies.remove('token');
    navigation('/login')
  }




  return (
    <div className='h-[8vh] bg-gray-700 text-white flex justify-between items-center px-4'>

      {/* Logo */}
      <div className='font-bold'>
        <h1 className='text-2xl'>TODO</h1>
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex space-x-6 font-serif text-md'>
        <Link to='/list' className='hover:cursor-pointer'>List</Link>
        <Link to='/' className='hover:cursor-pointer'>Add Task</Link>
          {
            !Cookies.get('token') ? (
                  <Link to='/login' className='hover:cursor-pointer'>Login</Link>
           
            ):(
            <button onClick={handleLogout} className='hover:cursor-pointer'>Logout</button>  
            )
          }
       
      </div>

      {/* Mobile Menu Button */}
      <button className='md:hidden' onClick={handleOpen}>
        {isMobileView ? <RxCross2 size={28}/> : <MdOutlineMenu size={28}/>}
      </button>

      {/* Mobile Menu */}
      <div className={isMobileView 
        ? 'absolute top-0 left-[60%] w-[30%] h-[20vh] bg-gray-700 text-white flex flex-col justify-center items-center space-y-2 text-[15px] font-serif '
        : 'hidden'
      }>
        <Link to='/list' onClick={handleOpen} className='hover:cursor-pointer'>List</Link>
        <Link to='/' onClick={handleOpen} className='hover:cursor-pointer'>Add Task</Link>
        <Link to='/login' onClick={handleOpen} className='hover:cursor-pointer'>Login</Link>
      </div>

    </div>
  )
}

export default Header
