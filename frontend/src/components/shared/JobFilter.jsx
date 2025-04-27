import React, { useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import usePortalStore from "@/store/portalStore";

const JobFilter = () => {
  const filterData = [
    
    {
      filterType: "Industry",
      array: [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Data Analyst",
        "Graphic Designer",
        "Software Engineer",
        "Fullstack Developer",
        "Tester"
      ],
    },
  ];

  const {selectedValues,setSelectedValues}=usePortalStore()

  const handleChangeValue = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) 
        : [...prev, value]
    );  
  };

  useEffect(()=>{
    console.log(selectedValues);
  },[selectedValues])

  return (
    <div className="w-full bg-white p-3 rounded-medium">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-1" />
      <div className="flex-1 h-[80vh] overflow-y-auto  scrollbar-hide">
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="text-lg font-semibold">{data.filterType}</h1>
            {data.array.map((arrItem, index) => (
              <div key={index} className="flex items-center space-x-2 my-1">
                <Checkbox onCheckedChange={()=>handleChangeValue(arrItem)} id={arrItem} />
                <label htmlFor={arrItem}>{arrItem}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFilter;
