import mongoose from 'mongoose'

const conn = async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGO_URI}`)
        if(res){
            console.log("Db Connected!");
        }
    } catch (error) {
        console.log("Error connecting db:",error);
    }
}
export default conn;