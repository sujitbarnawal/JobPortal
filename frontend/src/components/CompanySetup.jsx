import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import axios from "axios";

const CompanySetup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const getInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const getFile = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  //   console.log(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/company/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCompanyById = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/company/get/${id}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setInput({
            name: response?.data?.company?.name || "",
            description: response?.data?.company?.description || "",
            website: response?.data?.company?.website || "",
            location: response?.data?.company?.location || "",
            file: response?.data?.company?.logo || null,
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    getCompanyById();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant={"outline"}
              className={
                "cursor-pointer flex items-center gap-2 text-gray-600 font-semibold"
              }
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div>
              <Label>Company Name</Label>
              <Input
                onChange={getInput}
                name="name"
                value={input.name}
                type="text"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                onChange={getInput}
                name="description"
                value={input.description}
                type="text"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                onChange={getInput}
                name="website"
                value={input.website}
                type="url"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                onChange={getInput}
                name="location"
                value={input.location}
                type="text"
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input onChange={getFile} accept="image/*" type="file" />
            </div>
          </div>
          {!loading ? (
            <Button type="submit" className={"w-full mt-8 cursor-pointer"}>
              Update
            </Button>
          ) : (
            <Button className={"mt-8 w-full cursor-pointer"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait....
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
