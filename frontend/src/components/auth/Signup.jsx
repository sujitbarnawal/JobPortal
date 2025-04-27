import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import usePortalStore from "../../store/portalStore";
import { Loader2 } from "lucide-react";
import NavbarAlternative from "../shared/NavbarAlternative";

const Signup = () => {
  const fileInputRef = useRef(null);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { authLoading, setAuthLoading,user } = usePortalStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);
    try {
      setAuthLoading(true);
      const response = await axios.post(`${url}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(()=>{
      if(user){
        navigate('/')
      }
    })

  return (
    <div>
      <NavbarAlternative />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="w-1/2 border rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-2xl text-center mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              value={input.fullname}
              onChange={(e) => setInput({ ...input, fullname: e.target.value })}
              className="my-2"
              type="text"
              placeholder="Sujit Barnawal"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              className="my-2"
              type="email"
              placeholder="sujit@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className="my-2"
              type="password"
              minLength={8}
              placeholder="password"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              value={input.phoneNumber}
              onChange={(e) =>
                setInput({ ...input, phoneNumber: e.target.value })
              }
              className="my-2"
              type="number"
              min={1000000000}
              max={9999999999}
              placeholder="9800000000"
            />
          </div>
          <div className="my-2">
            <Label className={"mb-2"}>Role</Label>
            <Select
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="recruiter">Recruiter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              ref={fileInputRef}
              onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
              className={"cursor-pointer"}
              type={"file"}
              accept="image/*"
            ></Input>
          </div>
          {!authLoading ? (
            <Button className={"mt-4 w-full cursor-pointer"} type="submit">
              Signup
            </Button>
          ) : (
            <Button className={"mt-4 w-full cursor-pointer"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait....
            </Button>
          )}
          <span>
            Already have an account?{" "}
            <NavLink className={"text-[#6A38C2] font-bold"} to={"/login"}>
              Login
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
