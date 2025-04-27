import Job from "../models/jobModels.js"
import User from "../models/userModel.js";


export const postJob=async(req,res)=>{
    try {
        const {title,description,location,salary,jobType,requirements,position,companyId,experience}=req.body;
        const userId=req._id;

        if(!title||!description||!requirements||!location||!salary||!jobType||!position||!companyId||!experience){
            return res.status(400).json({message:"Please fill in all fields",success:false})
        }
        const user = await User.findById(userId);
        if(user.role!=="recruiter"){
            return res.status(400).json({message:"You are not a recruiter",success:false})
        }
        const newJob=await new Job({
            title:title,
            description:description,
            location:location,
            salary:Number(salary),
            jobType:jobType,
            requirements:requirements.split(","),
            position:position,
            company:companyId,
            experience:experience,
            createdBy:userId,
        })
        await newJob.save()
        res.status(201).json({message:"Job posted successfully",newJob,success:true})
    } catch (error) {
        return res.status(500).json({message:"Error in posting job",success:false})
    }
}

export const getAllJobs=async(req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"} },
                {description:{$regex:keyword,$options:"i"} },
            ]
        }

        const jobs=await Job.find(query).populate("company").populate("createdBy").sort({createdAt:-1})
        if(!jobs){
            return res.status(404).json({message:"No jobs found",success:false})
        }
        res.status(200).json({jobs,success:true})
    } catch (error) {
        return res.status(500).json({message:"Error in getting all jobs",success:false})
    }
}

export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate("company").populate("applications").populate("createdBy").sort({createdAt:-1})
        if(!job){
            return res.status(404).json({message:"Job not found",success:false})
        }
        res.status(200).json({job,success:true})
    } catch (error) {
        return res.status(500).json({message:"Error in getting job by id",success:false})
    }
}

export const getAdminJob=async(req,res)=>{
    try {
        const adminId=req._id;
        const jobs=await Job.find({createdBy:adminId}).populate("company").populate("createdBy").sort({createdAt:-1})
        if(!jobs){
            return res.status(404).json({message:"No jobs found",success:false})
        }
        res.status(200).json({jobs,success:true})
    } catch (error) {
        return res.status(500).json({message:"Error in getting admin job",success:false})
    }
}