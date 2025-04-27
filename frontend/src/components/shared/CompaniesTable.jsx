import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = ({ filteredCompanies }) => {
  const navigate = useNavigate();

  if (!filteredCompanies.length) {
    return (
      <span className="text-lg font-bold">
        You have not registered a Company.
      </span>
    );
  }

  return (
    <Table>
      <TableCaption>List of Registered Companies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCompanies.map((company) => (
          <TableRow key={company._id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={company.logo} alt="logo" />
              </Avatar>
            </TableCell>
            <TableCell>{company.name}</TableCell>
            <TableCell>
              {new Date(company.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div
                    className="flex gap-4 items-center w-fit cursor-pointer"
                    onClick={() => navigate(`/admin/company/${company._id}`)}
                  >
                    <Edit className="w-4" />
                    <span className="hover:underline">Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompaniesTable;
