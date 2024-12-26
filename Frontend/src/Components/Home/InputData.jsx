import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

const InputData = ({ inputDiv, setInputDiv, updatedData, setUpdatedData }) => {
    const [data, setData] = useState({ title: '', desc: '' })
    const headers = {
        id: localStorage.getItem('id'),
        authorization: ` Bearer ${localStorage.getItem('token')}`
    }

    useEffect(() => {
        setData({ title: updatedData.title, desc: updatedData.desc })
    }, [updatedData])

    const change = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const submit = async () => {
        try {
            if (data.title === '' || data.desc === '') {
                alert("All fields are required!")
            } else {
                await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v2/addtask`,
                    data,
                    { headers })
                setData({ title: '', desc: '' })
                setInputDiv("hidden")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async () => {
        try {
            if (data.title === '' || data.desc === '') {
                alert("All fields are required!")
            } else {
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v2/updatetask/${updatedData.id}`,
                    data,
                    { headers })
                setUpdatedData({ id: '', title: '', desc: '' })
                setData({ title: '', desc: '' })
                setInputDiv("hidden")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className={`${inputDiv} top-0 left-0 bg-gray-500 opacity-50 h-screen w-full`}></div>
            <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-3/6 bg-gray-900 p-4 rounded-xl'>
                    <div className='flex justify-end text-2xl'>
                        <button onClick={() => {
                            setInputDiv("hidden")
                            setData({ title: '', desc: '' })
                            setUpdatedData({ id: '', title: '', desc: '' })
                        }}>
                            <RxCross2 />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder='Enter Your Title'
                        name="title"
                        className='px-3 py-2 rounded-md w-full bg-gray-700 outline-none border-none my-3'
                        value={data.title}
                        onChange={change}
                    />
                    < textarea
                        name="desc"
                        placeholder='Enter Your Description'
                        cols="30"
                        rows="10"
                        className='px-3 py-2 rounded-md w-full my-3 bg-gray-700 outline-none border-none'
                        value={data.desc}
                        onChange={change}
                    />
                    {updatedData.id === "" ?
                        <button className='px-3 py-2 bg-blue-500 rounded-md text-black font-semibold' onClick={submit}>Submit</button> :
                        <button className='px-3 py-2 bg-blue-500 rounded-md text-black font-semibold' onClick={updateTask}>Update</button>
                    }



                </div>
            </div>
        </>
    )
}

export default InputData
