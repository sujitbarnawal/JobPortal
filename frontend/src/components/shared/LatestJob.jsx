import React, { useEffect } from "react";
import LatestJobCart from "./LatestJobCart";
import usePortalStore from "@/store/portalStore";

const LatestJob = () => {
  const {jobs,getAllJobs}=usePortalStore()

  useEffect(()=>{
    getAllJobs()
  },[getAllJobs])
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6a38c2]">Latest & Top </span>{" "}
        <span>Job Openings</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {jobs.slice(0,6).map((job, index) => (
          <LatestJobCart key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJob;
