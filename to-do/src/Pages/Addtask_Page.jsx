import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Addtask_Page = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectIds, setSelectIds] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fatchData = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get/todo");
      setTasks(result.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchData();
  }, []);

  const handleUpdate = (id) => {
    const loadingId = toast.loading("Loading......");
    setTimeout(() => {
      toast.dismiss(loadingId);
      navigate(`/update/${id}`);
    }, 1000);
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:5000/delete/${id}`);
      if (result.status === 200) {
        toast.success("Task Deleted");
      }
      fatchData();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCheck = (id) => {
    if (selectIds.includes(id)) {
      setSelectIds(selectIds.filter(prev => prev !== id));
    } else {
      setSelectIds([...selectIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectIds([]);
      setSelectAll(false);
    } else {
      const allIds = tasks.map(task => task._id);
      setSelectIds(allIds);
      setSelectAll(true);
    }
  };



  const handleMultipleDelete = async ()=>{
    try {
        const result = await axios.delete('http://localhost:5000/delete/multiple' ,{
          data :{ ids : selectIds}
        })
        console.log(result.data , "delete")
    } catch (error) {
      
    }
  }



  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Task List</h2>
        <Button
          text="Delete"
          color="bg-red-600"
          textcolor="text-white"
          onClick={handleMultipleDelete}
        />
      </div>

      {/* ✅ Table */}
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-gray-100 text-center">
          <tr>
            <th className="border p-2 text-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-4 h-4 accent-blue-500"
              />
            </th>
            <th className="border p-2">S.No</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tasks) && tasks.map((task, index) => (
            <tr key={task._id}>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectIds.includes(task._id)}
                  onChange={() => handleCheck(task._id)}
                  className="w-4 h-4 accent-blue-500"
                />
              </td>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{task.title}</td>
              <td className="border p-2">{task.description}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <Button 
                  text="Delete" 
                  color="bg-orange-500" 
                  textcolor="text-white" 
                  onClick={() => handleDelete(task._id)} 
                />
                <Button 
                  text="Update" 
                  color="bg-blue-500" 
                  textcolor="text-white" 
                  onClick={() => handleUpdate(task._id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Addtask_Page;
