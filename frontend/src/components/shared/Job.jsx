import React from "react";
import { Button } from "../ui/button";

import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {

  const navigate=useNavigate()
  const getDaysAgo = (isoDate) => {
    const now = new Date();
    const past = new Date(isoDate);
    const diffTime = Math.abs(now - past);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <div className="p-5 min-h-[42vh]  bg-white rounded-md shadow-xl border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{getDaysAgo(job.createdAt)} </p>
        <Button variant="outline" className="rounded-full " size={"icon"}>
          <Bookmark></Bookmark>
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6 " size={"icon"}>
          <Avatar>
            <AvatarImage alt="company-logo" src={job.company.logo}></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">{job.company.name}</h1>
          <p className="text-sm text-gray-600">{job.location}</p>
        </div>
      </div>
      <div className="">
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">
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
      <div className="mt-4 flex items-center gap-4 ">
        <Button onClick={()=>navigate(`/job/${job._id}/details`)} variant={"outline"} className={"cursor-pointer"} >Details</Button>
        <Button variant={"outline"} className={"bg-[#6a38c2] cursor-pointer hover:text-white text-white hover:bg-[#6b38c2ec]"}>Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
