import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import usePortalStore from "@/store/portalStore";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {

  const [query,setQuery]=useState("")
  const {setSearchedQuery,user}=usePortalStore()
  const navigate=useNavigate()

  const searchJob=()=>{
    setSearchedQuery(query)
    navigate('/browse')
  }

  return (
    <div className="text-center">
      <div className="flex flex-col  gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium">
          Top Job Portal in the market
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#6a38c2] ">Dream Jobs</span>
        </h1>
        <p>
          An online platform that connects job seekers with employers. 
        </p>
        {user &&
        <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          onChange={(e)=>setQuery(e.target.value)}
          type={"text"}
          placeholder={"Find Your Dream Jobs"}
          className={"outline-none border-none w-full"}
        ></input>
        <Button onClick={searchJob} className={"rounded-full rounded-l-none bg-[#6a38c2] hover:bg-[#6b38c2dc]  cursor-pointer"}>
          <Search className="h-5 w-5"/>
        </Button>
      </div>
        }
        
      </div>
    </div>
  );
};

export default HeroSection;
