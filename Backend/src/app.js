import express from 'express'
import dotenv from 'dotenv'
import conn from './Db/connn.js'
import cors from 'cors'
import userroutes from './routes/user.routes.js'
import taskroutes from './routes/tasks.router.js'


const app = express()
dotenv.config({
    path:'./.env'
})

app.use(express.json())
app.use(cors())
conn(); //db connection
app.use('/api/v1',userroutes)
app.use('/api/v2',taskroutes)



app.get('/', (req,res) => {
    res.send("Hello")
}) 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})