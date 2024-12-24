import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

const Cards = ({ home, setInputDiv, data = [], setUpdatedData }) => {
    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const handleComplete = async (id) => {
        try {
            const res = await axios.put(`http://localhost:3000/api/v2/updatecomptask/${id}`, {}, { headers });
            console.log(res);
        } catch (error) {
            console.error('Error updating task completion status:', error);
        }
    };

    const handleImpTask = async (id) => {
        try {
            const res = await axios.put(`http://localhost:3000/api/v2/updateimptask/${id}`, {}, { headers });
            console.log(res);
        } catch (error) {
            console.error('Error updating task importance:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v2/deletetask/${id}`, { headers });
            console.log(res);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleUpdate = (id, title, desc) => {
        setInputDiv('fixed');
        setUpdatedData({ id, title, desc });
    };

    return (
        <div className='grid grid-cols-3 gap-5 p-4'>
            {data.length > 0 ? (
                data.map((items) => (
                    <div key={items._id} className='bg-gray-800 rounded-2xl p-4'>
                        <div className='flex flex-col justify-between'>
                            <h3 className='text-xl font-semibold'>{items.title}</h3>
                            <p className='text-gray-300 my-2'>{items.desc}</p>
                            <div className='mt-4 flex items-center'>
                                <button
                                    className={`${items.complete === false ? 'bg-red-700' : 'bg-green-700'
                                        } p-2 rounded-md w-3/6`}
                                    onClick={() => handleComplete(items._id)}
                                >
                                    {items.complete === true ? 'Completed' : 'Incomplete'}
                                </button>
                                <div className='w-3/6 text-[1.4rem] flex justify-around'>
                                    <button onClick={() => handleImpTask(items._id)}>
                                        {items.important === false ? <CiHeart /> : <FaHeart className='text-red-700' />}
                                    </button>
                                    {home !== "false" &&
                                        <button onClick={() => handleUpdate(items._id, items.title, items.desc)}>
                                            <MdEdit />
                                        </button>
                                    }
                                    <button onClick={() => handleDelete(items._id)}>
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-gray-400'>No tasks available</p>
            )}

            {home === 'true' && (
                <button
                    className='flex flex-col justify-center items-center text-gray-300 bg-gray-800 rounded-2xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-400'
                    onClick={() => setInputDiv('fixed')}
                >
                    <h2 className='text-2xl mt-3'>Add Task</h2>
                    <IoIosAddCircle className='text-5xl mt-2' />
                </button>
            )}
        </div>
    );
};

export default Cards;
