import React from 'react'
import Header from './Pages/Header'
import {Toaster} from "react-hot-toast"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Addtask_Page from './Pages/Addtask_Page'
import NewTask_Page from './Pages/NewTask_Page'
import Update_Page from './Pages/Update_Page'
import Login_page from './Pages/Login_page'
import SignUp_Page from './Pages/SignUp_Page'

const App = () => {
  return (
   <>
   <BrowserRouter>
   
   <Header/>
    
   <Routes>
    <Route path='/list' element={<Addtask_Page/>} ></Route>
    <Route path='/' element={<NewTask_Page/>} ></Route>
  <Route path='/update/:id' element={<Update_Page />} />
     <Route path='/login' element={<Login_page/> } ></Route>
    <Route path='/sign' element={<SignUp_Page/>}></Route>
   
   </Routes>
<Toaster />
   </BrowserRouter>
   </>
  )
}

export default App