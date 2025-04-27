import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCart = ({job}) => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/job/${job._id}/details`)} className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job.company.name}</h1>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-500">
          {job.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant={"ghost"} className={"text-blue-700 font-bold"}>
          {job.position} positions
        </Badge>
        <Badge variant={"ghost"} className={"text-[#f83002] font-bold"}>
          {job.jobType}
        </Badge>
        <Badge variant={"ghost"} className={"text-[#7209b7] font-bold"}>
          {job.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCart;
