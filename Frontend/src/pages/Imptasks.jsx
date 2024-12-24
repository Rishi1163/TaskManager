import React, { useEffect, useState } from 'react';
import Cards from '../Components/Home/Cards';
import axios from 'axios';

const Imptasks = () => {
  const [data, setData] = useState([]); 
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v2/getimptasks', { headers });
        setData(res.data.data );
        console.log(res.data.data);
        
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setData([]);
      }
    };

    fetchTasks();
  });

  return (
    <div>
      <Cards home={"false"} data={data} />
    </div>
  );
};

export default Imptasks;
