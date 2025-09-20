import React from 'react'
import Button from '../components/Button'
import { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'

const NewTask_Page = () => {
  const [obj, setObj] = useState({
    title: "",
    description: ""
  })

  const onHandleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value })
  }


  const handleTask = (e) => {
    e.preventDefault()
    const apiAddTask =async () => {
      try {
        const response = await axios.post("http://localhost:5000/add/todo" ,{
          title : obj.title,
          description: obj.description
        })
        console.log(response.data, "ty")
        toast.success(response.data.message)
        setObj("")
        

      } catch (error) {
        console.log(error)
        toast.error("error")
      }
    }
    apiAddTask()
  }


  return (
    <div className='w-full h-[90vh] flex justify-center items-center'>
     <div className='h-[50vh] sm:h-[69vh] w-[80%] sm:w-[34%] shadow-2xl border flex flex-col  items-center p-4   '>

        <h1 className='text-center font-bold text-2xl mb-6 p-[4%]'>Add New Task</h1>

        <div className='flex flex-col items-center w-full gap-4'>

          <div className="w-[70%] flex flex-col">
            <label htmlFor="text" className='mb-1 font-medium text-gray-700'>
              Task Title
            </label>
            <input
              onChange={onHandleChange}
              type="text"
              id="text"
              name='title'
              value={obj.title}
              className='border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div className="w-[70%] flex flex-col">
            <label htmlFor="des" className='mb-1 font-medium text-gray-700'>
              Description
            </label>
            <textarea
              onChange={onHandleChange}
              value={obj.description}
              id="description"
              name='description'
              className='border px-3 py-2 rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'>
            </textarea>
          </div>
          <Button text="Add task" color='bg-blue-700' textcolor='text-white ' hoverColor='bg-blue-900 ' onClick={handleTask} />
        </div>
      </div>
    </div>
  )
}

export default NewTask_Page
