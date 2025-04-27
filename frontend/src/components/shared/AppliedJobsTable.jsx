import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import axios from "axios";

const AppliedJobsTable = () => {
  // const appliedJobs = [1, 2, 3, 4, 5];
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);

  useEffect(() => {
    const getAllAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/application/get-applied-jobs`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setAllAppliedJobs(response.data.appliedJobs);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getAllAppliedJobs();
  });

  return (
    <div>
      <Table>
        <TableCaption>List of applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className={"text-right"}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs &&
            allAppliedJobs.map((appliedJob, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(appliedJob.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{appliedJob.job.title}</TableCell>
                <TableCell>{appliedJob.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob.status === "accepted" ? "bg-green-500" : ""
                    }
                                ${
                                  appliedJob.status === "rejected"
                                    ? "bg-red-500"
                                    : ""
                                }
                                ${
                                  appliedJob.status === "pending"
                                    ? "bg-black"
                                    : ""
                                } text-white
                              `}
                  >
                    {appliedJob.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
