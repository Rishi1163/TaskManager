import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { authActions } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const [data, setData] = useState({ username: "", password: "" });

  const navigate = useNavigate(); 
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  if(isLoggedIn === true){
    navigate('/')
  }

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (data.username === "" || data.password === "") {
        alert("All fields are required");
      } else {
        const res = await axios.post('http://localhost:3000/api/v1/login', data);
        setData({ username: "", password: "" });
        localStorage.setItem("id",res.data.id)
        localStorage.setItem("token",res.data.token)
        dispatch(authActions.login())
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className='flex justify-center items-center h-[98vh]'>
      <div className='p-4 w-2/6 bg-gray-800 rounded-lg'>
        <div className='text-3xl flex justify-center mb-3'>Login</div>
        <input 
        type="username" 
        placeholder='Username'
        className='bg-gray-700 px-3 py-2 w-full my-3 rounded-md border-none outline-none'
        name='username'
        onChange={change}
        value={data.username}
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
            <button className='bg-blue-400 text-black rounded-md font-semibold px-3 py-2 my-2' onClick={submit}>Login</button>
            <p className='text-gray-300 mr-2'>Don't have an account? {" "}
            <Link to='/signup' className=' hover:underline'>
            Signup
            </Link>
            </p>
           
        </div>
      </div>
    </div>
  )
}

export default Login
