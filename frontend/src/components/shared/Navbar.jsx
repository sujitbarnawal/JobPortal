/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import usePortalStore from "@/store/portalStore";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = usePortalStore();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${url}/user/logout`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setUser(null);
        navigate("/login");
        toast.success(response.data.message || "Logout successful.");
      } else {
        toast.error(
          response.data.message || "Logout failed. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Logout failed. Please try again."
      );
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-white flex items-center justify-between mx-auto max-w-7xl h-16 ">
      <div>
        <h1
          onClick={() => {
            if (user.role === "recruiter") {
              navigate("/admin/companies");
            } else {
              navigate("/");
            }
          }}
          className="text-2xl font-bold cursor-pointer"
        >
          Job<span className="text-[#F83002]">Seek</span>
        </h1>
      </div>
      <div>
        <ul className="flex  font-medium items-center gap-5">
          {user && user.role == "student" ? (
            <>
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? "text-[#6A38C2]" : "")}
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to={"/jobs"}
                className={({ isActive }) => (isActive ? "text-[#6A38C2]" : "")}
              >
                <li>Jobs</li>
              </NavLink>
              <NavLink
                to={"/browse"}
                className={({ isActive }) => (isActive ? "text-[#6A38C2]" : "")}
              >
                <li>Browse</li>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={"/admin/companies"}
                className={({ isActive }) => (isActive ? "text-[#6A38C2]" : "")}
              >
                <li>Companies</li>
              </NavLink>
              <NavLink
                to={"/admin/jobs"}
                className={({ isActive }) => (isActive ? "text-[#6A38C2]" : "")}
              >
                <li>Jobs</li>
              </NavLink>
            </>
          )}

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className={"cursor-pointer"}>
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto
                        ? user.profile.profilePhoto
                        : "https://github.com/shadcn.png"
                    }
                    alt="profile-photo"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className={"w-80"}>
                <div className="gap-3 flex flex-col">
                  <div className="flex gap-2 space-y-1">
                    <Avatar className={"cursor-pointer"}>
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto
                            ? user.profile.profilePhoto
                            : "https://github.com/shadcn.png"
                        }
                        alt="profile-photo"
                      />
                    </Avatar>

                    <div>
                      <h4 className="font-medium">{user.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.profile.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex  flex-col  text-gray-600">
                    {user.role==="student" &&
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button
                        onClick={() => navigate("/profile")}
                        className={"cursor-pointer hover:underline"}
                        variant="Link"
                      >
                        View Profile
                      </Button>
                    </div>}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button
                        onClick={() => handleLogout()}
                        className={"cursor-pointer hover:underline"}
                        variant="Link"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button className={"cursor-pointer"} variant={"outline"}>
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button
                  className={
                    "bg-[#6A38c2] hover:bg-[#5b30a6] cursor-pointer mr-2"
                  }
                >
                  SignUp
                </Button>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
