import React, { useEffect, useState } from 'react';
import Cards from '../Components/Home/Cards';
import { IoIosAddCircle } from "react-icons/io";
import InputData from '../Components/Home/InputData';
import axios from 'axios';

const Alltasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [data, setData] = useState({ task: [] });
  const [ updatedData , setUpdatedData ] = useState({id:'',title:'',desc:''})

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v2/getalltasks`, { headers });
        if (res.data && res.data.data) {
          setData(res.data.data);
        } else {
          setData({ task: [] }); 
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchTasks();
    }
  });

  return (
    <>
      <div className="w-full flex justify-end text-gray-400 p-2 hover:text-gray-200 transition-all duration-300">
        <button onClick={() => setInputDiv("fixed")}>
          <IoIosAddCircle className="text-3xl" />
        </button>
      </div>
      {data.task && data.task.length > 0 ? (
        <Cards home={"true"} setInputDiv={setInputDiv} data={data.task} setUpdatedData={setUpdatedData}/>
      ) : (
        <p className="text-center text-gray-400 mt-4">No tasks available. Add a task to get started!</p>
      )}
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setUpdatedData={setUpdatedData}/>
    </>
  );
};

export default Alltasks;
