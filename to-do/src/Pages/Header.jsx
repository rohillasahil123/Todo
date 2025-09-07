import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='h-[8vh] bg-gray-700 text-white flex justify-between'>
        <div className='font-bold p-3'> 
            <h1 className='text-2xl'>TODO</h1>
        </div>
        <div className='flex space-x-3 p-3 font-serif text-md'>
            <div className='hover:cursor-pointer' ><Link to='/list' >List</Link></div>
            <div className='hover:cursor-pointer' > <Link to='/' >Add Task</Link></div>
        </div>
    </div>
  )
}

export default Header