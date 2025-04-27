import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const NewJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
    requirements: "",
    position: 0,
    experience: "",
    companyId: "",
  });

  const getInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const postJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/job/post`,input,
        { withCredentials: true }
      );
      if(response.data.success){
        toast.success(response.data.message)
        navigate('/admin/jobs') 
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/company/get`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setCompanies(response.data.companies);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch companies"
        );
      }
    };

    getAllCompanies();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col justify-center w-screen my-5 ">
        <h1 className="my-5 text-lg font-bold">Create a Job</h1>
        <form
          onSubmit={postJob}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-5">
            <div>
              <Label>Title</Label>
              <Input
                onChange={getInput}
                value={input.title}
                type={"text"}
                name="title"
                className={"focus-visible:offset-0 focus-visible:ring-0 my-1"}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                onChange={getInput}
                value={input.description}
                type={"text"}
                name="description"
                className={"focus-visible:offset-0 focus-visible:ring-0 my-1"}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                onChange={getInput}
                value={input.location}
                type={"text"}
                name="location"
                className={"focus-visible:offset-0 focus-visible:ring-0 my-1"}
              />
            </div>
            <div>
              <Label>Salary(in LPA)</Label>
              <Input
                onChange={getInput}
                value={input.salary}
                type={"number"}
                name="salary"
                className={"focus-visible:offset-0 focus-visible:ring-0 my-1"}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                onChange={getInput}
                value={input.jobType}
                type={"text"}
                name="jobType"
                className={"focus-visible:offset-0 focus-visible:ring-0 my-1"}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                onChange={getInput}
                value={input.requirements}
                type={"requirements"}
                name="requirements"
                className={"focus-visible:offset-0 focus-visible:ring-0 my-1"}
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                onChange={getInput}
                value={input.position}
                type={"number"}
                name="position"
                className={"focus-visible:offset-0 focus-visible:ring-0 my-1"}
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                onChange={getInput}
                value={input.experience}
                type={"text"}
                name="experience"
                className={"focus-visible:offset-0 focus-visible:ring-0 my-1"}
              />
            </div>
            {companies.length!==0 && (
              <div>
                <Label>Company</Label>
                <Select
                  value={input.companyId}
                  onValueChange={(value) =>
                    setInput({ ...input, companyId: value })
                  }
                >
                  <SelectTrigger className="w-full my-2">
                    <SelectValue placeholder="company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company, index) => (
                      <div key={index}>
                        <SelectItem value={company._id}>
                          {company.name}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {!loading ? (
            <Button className={`w-full mt-4 cursor-pointer ${companies.length===0?"hidden":""}`} type="submit">
              Post New Job
            </Button>
          ) : (
            <Button className={"mt-4 w-full cursor-pointer"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait....
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-red-600 font-bold text-center my-3 text-xs">
              No companies found. Please create a company first.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewJob;
