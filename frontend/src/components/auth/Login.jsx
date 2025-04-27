import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import axios from "axios";
import usePortalStore from "../../store/portalStore";
import { Loader2 } from "lucide-react";
import NavbarAlternative from "../shared/NavbarAlternative";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;
  const { setAuthLoading, authLoading,setUser } = usePortalStore();
  const {user}=usePortalStore()

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setAuthLoading(true);
      const response = await axios.post(`${url}/user/login`, input, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user)
        // console.log(response.data.user);
        navigate("/");
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
          <h1 className="font-bold text-2xl text-center mb-5">Login</h1>
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
              placeholder="password"
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
          {!authLoading ? (
            <Button className={"mt-4 w-full cursor-pointer"} type="submit">
              Login
            </Button>
          ) : (
            <Button className={"mt-4 w-full cursor-pointer"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait....
            </Button>
          )}

          <span>
            Dont have an account?{" "}
            <NavLink className={"text-[#6A38C2] font-bold"} to={"/signup"}>
              Signup
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
