import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import JobApplicantsTable from "./shared/JobApplicantsTable";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobApplicants = () => {
  const [allApplicants, setAllApplicants] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getApplicants = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/application/${id}/applicants`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setAllApplicants(response.data.allApplicants);
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    getApplicants();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto ">
        <h1 className="font-bold text-xl my-5">
          Applicants ({allApplicants?.applications?.length})
        </h1>
        {allApplicants?.applications?.length > 0 && (
          <JobApplicantsTable applications={allApplicants?.applications} />
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
