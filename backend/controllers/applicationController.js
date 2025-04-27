import Application from "../models/applicationModel.js"
import Job from "../models/jobModels.js"

export const applyJob=async(req,res)=>{
    try {
        const userId=req._id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({message:"Job id is required",success:false})
        }
        //checking if user already applied 
        const userApplied=await Application.findOne({applicant:userId,job:jobId});
        if(userApplied){
            return res.status(400).json({message:"You already applied for this job",success:false})
        }
        //checking if job is active
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(400).json({message:"Job not found",success:false})
        }

        const newApplication = await new Application({
            applicant:userId,
            job:jobId,
        })
        await newApplication.save()
        job.applications.push(newApplication)
        await job.save()
        console.log(job);
        
        res.status(200).json({message:"Application submitted successfully",success:true})

    } catch (error) {
        console.error("Apply Job Error:", error);
        return res.status(500).json({message:"Error in applying job",success:false})
    }
}

export const getAllAppliedJobs=async(req,res)=>{
    try {
        const userId=req._id;
        const userApplied=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            },
        })
        if(!userApplied){
            return res.status(400).json({message:"No jobs applied",success:false})
        }
        res.status(200).json({appliedJobs:userApplied,success:true})
    } catch (error) {
        return res.status(500).json({message:"Error in getting all applied jobs",success:false})
    }
}

export const getAllApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
                options:{sort:{createdAt:-1}},
            }
        })
        if(!job){
            return res.status(400).json({message:"No job found",success:false})
        }
        res.status(200).json({allApplicants:job,success:true})
    } catch (error) {
        return res.status(500).json({message:"Error in getting all applicants",success:false})
    }
}


export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({message:"Status is required",success:false})
        }
        const application=await Application.findByIdAndUpdate(applicationId,{status})
        if(!application){
            return res.status(400).json({message:"Application not found",success:false})
        }
        res.status(200).json({message:"Status updated successfully",success:true})
    } 
    catch (error) {
        return res.status(500).json({message:"Error in updating status",success:false})
    }
}