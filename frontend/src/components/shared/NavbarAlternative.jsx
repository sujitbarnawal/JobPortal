

import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";


const NavbarAlternative = () => {

  const navigate = useNavigate();
 

  

  return (
    <div className="bg-white flex items-center justify-between mx-auto max-w-7xl h-16 ">
      <div>
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          Job<span className="text-[#F83002]">Seek</span>
        </h1>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <Link to={"/login"}>
            <Button className={"cursor-pointer"} variant={"outline"}>
              Login
            </Button>
          </Link>
          <Link to={"/signup"}>
            <Button
              className={"bg-[#6A38c2] hover:bg-[#5b30a6] cursor-pointer mr-2"}
            >
              SignUp
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarAlternative;
