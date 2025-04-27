import jwt from 'jsonwebtoken'

const authenticate=async(req,res,next)=>{
    try {
        const token= await req.cookies.token
        if(!token) return res.status(401).json({message:"Unauthorized",success:false})
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(401).json({message:"Unauthorized",success:false})
        }
        req._id=decode.userId
        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized",success:false})
    }
}

export default authenticate