import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import usePortalStore from "@/store/portalStore";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = usePortalStore();
  const url = import.meta.env.VITE_BACKEND_URL;
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill).join(","),
    file: user?.profile?.file,
  });

  const changeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileInputHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const response = await axios.post(`${url}/user/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        setUser(response.data.user);
        toast.success(response.data.message);
        console.log(response.data.user);
        setOpen(false);
        
        
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    } finally {
      setLoading(false);
      
    }
  };

 
  
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={"sm:max-w-[425px]"}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className={"text-right"}>
                  Name
                </Label>
                <Input
                  onChange={changeInput}
                  value={input.fullname}
                  id="name"
                  name="fullname"
                  type={"text"}
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className={"text-right"}>
                  Email
                </Label>
                <Input
                  onChange={changeInput}
                  value={input.email}
                  id="email"
                  name="email"
                  type={"email"}
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className={"text-right"}>
                  Contact
                </Label>
                <Input
                  onChange={changeInput}
                  value={input.phoneNumber}
                  id="number"
                  name="phoneNumber"
                  type={"number"}
                  className={"col-span-3"}
                  min={1000000000}
                  max={9999999999}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className={"text-right"}>
                  Bio
                </Label>
                <Input
                  onChange={changeInput}
                  value={input.bio}
                  id="bio"
                  name="bio"
                  type={"text"}
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className={"text-right"}>
                  Skills
                </Label>
                <Input
                  onChange={changeInput}
                  value={input.skills}
                  id="skills"
                  name="skills"
                  type={"text"}
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className={"text-right"}>
                  Resume
                </Label>
                <Input
                  onChange={fileInputHandler}
                  
                  id="file"
                  name="file"
                  type={"file"}
                  accept={"image/*"}
                  className={"col-span-3"}
                />
              </div>
            </div>
            <DialogFooter>
              {!loading ? (
                <Button className={"mt-4 w-full cursor-pointer"} type="submit">
                  Update
                </Button>
              ) : (
                <Button className={"mt-4 w-full cursor-pointer"}>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait....
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
