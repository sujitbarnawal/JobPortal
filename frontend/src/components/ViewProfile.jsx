import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobsTable from "./shared/AppliedJobsTable";
import UpdateProfile from "./shared/UpdateProfile";
import usePortalStore from "@/store/portalStore";

const ViewProfile = () => {
  const isResumeAvailable = true;
  const [open, setOpen] = useState(false);
  const {user}=usePortalStore()
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8 my-5 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className={"h-24 w-24"}>
              <AvatarImage
                alt="profile_picture"
                src={user?.profile?.profilePhoto ? user.profile.profilePhoto : "https://github.com/shadcn.png"}
              ></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p>{user.profile.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className={"text-right cursor-pointer"}
            variant={"outline"}
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-2 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 my-2">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className="w-[30%] my-5">
          <h1 className="text-md font-bold">Skills</h1>
          <div className="flex items-center gap-1 mt-2">
            {user.profile.skills.length ? (
              user.profile.skills.map((item, index) => (
                <Badge className={"bg-[#6a38c2]"} key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span className="font-bold">NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResumeAvailable ? (
            <a
              className="text-blue-500 w-full hover:underline cursor-pointer"
              target="_blank"
              href={user.profile.resume}
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-sm font-semibold">Resume not available</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-md font-bold">Applied Jobs</h1>
        <AppliedJobsTable />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default ViewProfile;
