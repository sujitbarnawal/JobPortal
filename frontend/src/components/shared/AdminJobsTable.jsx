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
import { Edit, Eye, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";


const AdminJobsTable = ({ filteredAdminJobs }) => {
  

  if (!filteredAdminJobs.length) {
    return (
      <span className="text-lg font-bold">
        You have not posted a Job.
      </span>
    );
  }

  

  

  return (
    <Table>
      <TableCaption>List of Posted Jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAdminJobs.map((job) => (
          <TableRow key={job._id}>
            <TableCell>{job.company.name}</TableCell>
            <TableCell>{job.title}</TableCell>
            <TableCell>
              {new Date(job.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  {/* <div
                    className="flex gap-4 items-center w-fit cursor-pointer"
                    
                  >
                    <Edit className="w-4" />
                    <span className="hover:underline">Edit</span>
                  </div> */}
                  <div
                    
                    className="flex  items-center w-fit cursor-pointer gap-2 "
                    
                  >
                    <Eye className="w-4" />
                    <Link to={`/admin/jobs/${job._id}/applicants`} className="hover:underline">Applicants</Link>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminJobsTable;
