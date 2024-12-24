import express from 'express'
import { Task } from '../Models/Task.models.js'
import { User } from '../Models/users.models.js'
import { authToken } from './auth.js'

const router = express.Router()

//addtask
router.post('/addtask',authToken,async(req,res)=>{
    try {
        const {title , desc } = req.body
        const { id } = req.headers
        const newTask = new Task({title:title,desc:desc})
        const saveTask = await newTask.save()
        
        //this is to push the task added in tasks table to the users task array
        const taskid = saveTask._id
        await User.findByIdAndUpdate(id,{$push:{task:taskid._id}})
        res.status(200).json({message:"Task added successfully!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error!"})
    }
})

//getallTasks
router.get('/getalltasks',authToken,async(req,res)=>{
    try {
        const { id } = req.headers
        const userData = await User.findById(id).populate({
            path:"task",
            options:{sort:{createdAt:-1}}
        })// populate is used to get of tasks in user db and sort is used to get latest tasks first
        return res.status(200).json({data:userData})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})

//delete tasks
router.delete('/deletetask/:id',authToken,async(req,res)=>{
    try {
        const { id } = req.params
        const userId = req.headers.id
        await Task.findByIdAndDelete(id)
        await User.findByIdAndUpdate(userId,{$pull:{task:id}})
        return res.status(200).json({message:"Task deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})

//update task
router.put('/updatetask/:id',authToken,async(req,res)=>{
    try {
        const { id } = req.params
        const { title , desc } = req.body
        await Task.findByIdAndUpdate(id,{ title : title , desc : desc})
        return res.status(200).json({message:"Task updated"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})

//update imp-task
router.put('/updateimptask/:id',authToken,async(req,res)=>{
    try {
        const { id } = req.params
        const taskData = await Task.findById(id)
       const isImp = taskData.important
       await Task.findByIdAndUpdate(id,{important:!isImp})
        return res.status(200).json({message:"Task updated"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})

//get imp-tasks
router.get('/getimptasks',authToken,async(req,res)=>{
    try {
        const { id } = req.headers
        const Data = await User.findById(id).populate({
            path:"task",
            match:{important:true},
            options:{sort:{createdAt:-1}}
        })
        const impTaskData = Data.task
        return res.status(200).json({data:impTaskData})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})

//update complete-task
router.put('/updatecomptask/:id',authToken,async(req,res)=>{
    try {
        const { id } = req.params
        const taskData = await Task.findById(id)
       const isComp = taskData.complete
       await Task.findByIdAndUpdate(id,{complete:!isComp})
        return res.status(200).json({message:"Task updated"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})

//get comp-tasks
router.get('/getcomptasks',authToken,async(req,res)=>{
    try {
        const { id } = req.headers
        const Data = await User.findById(id).populate({
            path:"task",
            match:{complete:true},
            options:{sort:{createdAt:-1}}
        })
        const compTaskData = Data.task
        return res.status(200).json({data:compTaskData})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})

//get incomp-tasks
router.get('/getincomptasks',authToken,async(req,res)=>{
    try {
        const { id } = req.headers
        const Data = await User.findById(id).populate({
            path:"task",
            match:{complete:false},
            options:{sort:{createdAt:-1}}
        })
        const compTaskData = Data.task
        return res.status(200).json({data:compTaskData})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})

export default router