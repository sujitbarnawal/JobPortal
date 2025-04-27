import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./shared/Job";
import usePortalStore from "@/store/portalStore";
import axios from "axios";
import { toast } from "sonner";

const Browse = () => {
  const { searchedQuery } = usePortalStore();
  const [jobs, setJobs] = useState(null);

  useEffect(() => {

    const getJobsByQuery = async () => {
      
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job/get`, {
          params: {keyword: searchedQuery }
        });
        if (response.data.success) {
          setJobs(response.data.jobs);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    getJobsByQuery();
  }, [searchedQuery]); 

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-lg my-10">
          Search Results ({jobs ? jobs.length : 0})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {jobs?.map((job, index) => (
            <Job job={job} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
