import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import axios from 'axios';
import { useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate(); 

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  if(isLoggedIn === true){
    navigate('/')
  }

  const [data, setData] = useState({ username: "", email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        alert("All fields are required");
      } else {
        const res = await axios.post('http://localhost:3000/api/v1/signup', data);
        setData({ username: "", email: "", password: "" });
        // console.log(res);
        alert(res.data.message);
      
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='flex justify-center items-center h-[98vh]'>
      <div className='p-4 w-2/6 bg-gray-800 rounded-lg'>
        <div className='text-3xl flex justify-center mb-3'>SignUp</div>
        <input
          type="username"
          placeholder='Username'
          className='bg-gray-700 px-3 py-2 w-full my-3 rounded-md border-none outline-none'
          name='username'
          onChange={change}
          value={data.username}
        />
        <input
          type="email"
          placeholder='Email'
          className='bg-gray-700 px-3 py-2 w-full my-3 rounded-md border-none outline-none'
          name='email'
          required
          onChange={change}
          value={data.email}
        />
        <input
          type="password"
          placeholder='Password'
          className='bg-gray-700 px-3 py-2 w-full my-3 rounded-md border-none outline-none'
          name='password'
          onChange={change}
          value={data.password}
        />
        <div className='flex w-full items-center justify-between'>
          <button className='bg-blue-400 text-black rounded-md font-semibold px-3 py-2 my-2' onClick={submit}>SignUp</button>
          <p className='text-gray-300 mr-2'>Already have an account?{" "}
            <Link to='/login' className='hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
