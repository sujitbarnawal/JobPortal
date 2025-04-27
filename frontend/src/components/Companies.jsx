import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CompaniesTable from "./shared/CompaniesTable";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Companies = () => {
  const navigate = useNavigate();
  const [search,setSearch]=useState("")
  const [companies,setCompanies]=useState([])
  

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
        toast.error(error.response?.data?.message || "Failed to fetch companies");
      }
    };

    getAllCompanies();
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input onChange={(e)=>setSearch(e.target.value)}  className={"w-fit"} placeholder={"Filter by name"} />
          <Button
            onClick={() => navigate("/admin/company/register")}
            className={"cursor-pointer"}
          >
            New Company
          </Button>
        </div>
        <CompaniesTable filteredCompanies={filteredCompanies} />
      </div>
    </div>
  );
};

export default Companies;
