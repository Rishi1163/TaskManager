import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportantOutline } from "react-icons/md";
import { BiCalendarCheck } from "react-icons/bi";
import { BiCalendarExclamation } from "react-icons/bi";
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth.js';
import axios from 'axios';

const Sidebar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState()

  const logout = () => {
    dispatch(authActions.logout())
    localStorage.clear('id')
    localStorage.clear('token')
    navigate('/signup')
  }

  const headings = [
    {
      title: "All Tasks",
      icon: <CgNotes />,
      path: '/'
    },
    {
      title: "Important Tasks",
      icon: <MdLabelImportantOutline />,
      path: '/importantTasks'
    },
    {
      title: "Complete Tasks",
      icon: <BiCalendarCheck />,
      path: '/completeTasks'
    },
    {
      title: "Incomplete Tasks",
      icon: <BiCalendarExclamation />,
      path: '/incompleteTasks'
    },
  ]

  const headers = {
    id: localStorage.getItem('id'),
    authorization: ` Bearer ${localStorage.getItem('token')}`
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:3000/api/v2/getalltasks', { headers })
      setData(res.data.data);
    }
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, [])
  return (
    <>
      {data &&
        <div className='mt-4'>
          <h2 className='text-xl font-semibold'>{data.username}</h2>
          <h3 className='my-2 text-gray-400'>{data.email}</h3>
          <hr />
        </div>
      }
      <div>
        {headings.map((item, i) => (
          <Link>
            <Link to={item.path} className='flex items-center gap-1 text-[1.06rem] my-1 hover:bg-gray-700 p-2 rounded-lg transition ease-out'>{item.icon} {item.title}</Link>
          </Link>
        ))}
      </div>
      <div>
        <button className='bg-gray-400 w-full p-2 rounded-lg' onClick={logout}>Logout</button>
      </div>
    </>
  )
}

export default Sidebar
