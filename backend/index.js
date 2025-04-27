import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/mongodb.js'
import userRoute from './routes/userRoutes.js'
import companyRoute from "./routes/companyRoutes.js"
import jobRoute from "./routes/jobRoutes.js"
import applicationRoute from "./routes/applicationRoute.js"
import path from 'path'

dotenv.config()

const app= express()

const _dirname=path.resolve()

//middlwares

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions={
    origin: [`${process.env.VITE_FRONTEND_URL}`],
    credentials: true,
}
app.use(cors(corsOptions))

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
connectDB()


//apis
app.use("/api/user",userRoute)
app.use("/api/company",companyRoute)
app.use("/api/job",jobRoute)
app.use("/api/application",applicationRoute)

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.get('/',(req,res)=>{
    res.send('Working')
})

