import jwt from 'jsonwebtoken'

const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"Access Denied!"})
    }
    jwt.verify(token,process.env.SECRET,(err,user)=>{
        if(err){
            return res.status(403).json(err)
        }
        req.user = user
        next()
    })
}

export { authToken }