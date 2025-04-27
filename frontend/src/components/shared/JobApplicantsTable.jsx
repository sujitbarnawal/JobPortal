import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Check, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const JobApplicantsTable = ({ applications }) => {


  const updateStatus=async(status,id)=>{
    try {
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/application/status/${id}/update`,{status},{
        withCredentials:true
      })
      if(response.data.success){
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>List of Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications &&
            applications.map((application, index) => (
              <TableRow key={index}>
                <TableCell>{application.applicant.fullname}</TableCell>
                <TableCell>{application.applicant.email}</TableCell>
                <TableCell>{application.applicant.phoneNumber}</TableCell>
                <TableCell>
                  {" "}
                  <a
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    href={application.applicant.profile.resume || ""}
                  >
                    {application.applicant.profile.resumeOriginalName ||
                      "Not Uploaded"}
                  </a>
                </TableCell>
                <TableCell>
                  {new Date(application.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-1">
                        <div onClick={()=>updateStatus("accepted",application._id)} className="hover:underline text-center cursor-pointer">
                          Accepted
                        </div>
                        <Check className="text-green-500 w-7" />
                      </div>
                      <div className="flex items-center gap-2 my-1">
                        <div onClick={()=>updateStatus("rejected",application._id)} className="hover:underline text-center cursor-pointer">
                          Rejected
                        </div>
                        <X className="text-red-500 w-10" />
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobApplicantsTable;
