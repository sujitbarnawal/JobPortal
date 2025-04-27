
import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import JobFilter from "./shared/JobFilter";
import Job from "./shared/Job";
import usePortalStore from "@/store/portalStore";
// import { motion } from "framer-motion";

const Jobs = () => {
  const { jobs, getAllJobs } = usePortalStore();

  useEffect(() => {
    getAllJobs();
  }, [getAllJobs]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* <div className="w-[20%]">
            <JobFilter />
          </div> */}
          {jobs.length ? (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job, index) => (
                  // <motion.div
                  //   key={index}
                  //   initial={{ opacity: 0, x: 100 }}
                  //   animate={{ opacity: 1, x: 0 }}
                  //   exit={{opacity:0,x:-100}}
                  //   transition={{ duration: 0.3 }}
                  // >
                  //   <Job job={job} />
                  // </motion.div>
                  <div key={index}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <span className="font-bold text-lg">No jobs available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
