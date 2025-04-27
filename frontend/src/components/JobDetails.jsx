/* eslint-disable react-hooks/exhaustive-deps */


import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import usePortalStore from "@/store/portalStore";

const JobDetails = () => {
  

  const [job,setJob]=useState(null)
  const [loading,setLoading]=useState(true)
  const {id}=useParams();
  const {user}=usePortalStore()
  const[isApplied,setIsApplied]=useState(false)

  const applyJob=async()=>{
      try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/application/apply/${id}`,{},{
          withCredentials:true,
        })
        if(response.data.success){
          toast.success(response.data.message)
        }else{
          console.log("Error")
        }
      } catch (error) {
        console.error(error)
        toast.error(error.response.data.message)
      }
  }

  useEffect(()=>{
    const fetchJob = async () => {
      try {
        
        
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job/get/${id}`);
        if (response.data.success) {
          setJob(response.data.job);
          setIsApplied(response.data.job?.applications?.some(application=>application.applicant===user?._id) || false)
          
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob()
  },[id,applyJob])

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!job) return <div className="text-center mt-10">Job not found</div>;

  
  

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <h1 className="font-bold text-xl">{job.title}</h1>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mt-4">
            <Badge variant={"ghost"} className={"text-blue-700 font-bold"}>
              {job.position} positions
            </Badge>
            <Badge variant={"ghost"} className={"text-[#f83002] font-bold"}>
              {job.jobType}
            </Badge>
            <Badge variant={"ghost"} className={"text-[#7209b7] font-bold"}>
              {job.salary} monthly
            </Badge>
          </div>
          {
            user.role==="student" &&
            <Button
            onClick={()=>applyJob()}
            className={`rounded-lg cursor-pointer ${
              isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#6a38c2]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
          }
          
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium my-4">{job.description}</h1>
        <div className=" my-4">
            <h1 className="font-bold my-1">Role : <span className="pl-4 font-normal text-gray-800">{job.title}</span></h1>
            <h1 className="font-bold my-1">Location : <span className="pl-4 font-normal text-gray-800">{job.location}</span></h1>
            <h1 className="font-bold my-1">Requirements : <span className="pl-4 font-normal text-gray-800">{job.requirements}</span></h1>
            <h1 className="font-bold my-1">Experience : <span className="pl-4 font-normal text-gray-800">{job.experience}</span></h1>
            <h1 className="font-bold my-1">Salary : <span className="pl-4 font-normal text-gray-800">{job.salary} LPA</span></h1>
            <h1 className="font-bold my-1">Total Applicants : <span className="pl-4 font-normal text-gray-800">{job.applications.length}</span></h1>
            <h1 className="font-bold my-1">Posted Date : <span className="pl-4 font-normal text-gray-800">{(new Date(job.createdAt).toLocaleString())}</span></h1>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
