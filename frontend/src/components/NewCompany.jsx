/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

const NewCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState(null);
  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState(null);

  const registerNewCompany = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/company/register`,
        { companyName },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setCompany(response.data.company);
        navigate(`/admin/company/${response?.data?.company?._id}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Register Your Company </h1>
          <p className="text-gray-600 text-lg"></p>
        </div>

        <Label>Company Name</Label>
        <Input
          onChange={(e) => setCompanyName(e.target.value)}
          type={"text"}
          className={"my-2"}
          placeholder="Google"
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            onClick={() => navigate("/admin/companies")}
            className={"cursor-pointer"}
            variant={"outline"}
          >
            Cancel
          </Button>
          
          {!loading ? (
            <Button
            onClick={() => registerNewCompany()}
            className={"cursor-pointer"}
          >
            Continue
          </Button>
          ) : (
            <Button className={"cursor-pointer"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait....
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCompany;
