
import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import AdminJobsTable from "./shared/AdminJobsTable";

const AdminJobs = () => {
  const navigate = useNavigate();
  const [search,setSearch]=useState("")

  const [adminJobs,SetAdminJobs]=useState([])
  

  useEffect(() => {
    const getAllAdminJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/job/getadminjobs`,
          { withCredentials: true }
        );
        if (response.data.success) {
          SetAdminJobs(response.data.jobs); 
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch companies");
      }
    };

    getAllAdminJobs();
  }, []);

  const filteredAdminJobs = adminJobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company?.name.toLowerCase().includes(search.toLowerCase())
  );
  
  

  
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input onChange={(e)=>setSearch(e.target.value)}  className={"w-fit"} placeholder={"Filter by role/company"} />
          <Button
            onClick={() => navigate("/admin/job/register")}
            className={"cursor-pointer"}
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable filteredAdminJobs={filteredAdminJobs}/>
      </div>
    </div>
  );
};

export default AdminJobs;
