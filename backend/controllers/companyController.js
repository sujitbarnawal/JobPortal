import Company from "../models/companyModels.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Please enter company name", success: false });
    }
    let company = await Company.findOne({ name:companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "Company name already exists", success: false });
    }
    company = await new Company({
      name: companyName,
      userId: req._id,
    });
    await company.save();
    res.status(200).json({
      message: "Company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating company", success: false });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req._id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(400)
        .json({ message: "No companies found", success: false });
    }
    res.status(200).json({ companies, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById( companyId );
    if (!company) {
      return res
        .status(400)
        .json({ message: "Company not found", success: false });
    }
    res.status(200).json({ company, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;


    const file = req.file;
    const fileUri = getDataUri(file)

    const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
    const logo=cloudResponse.secure_url


    const company = await Company.findByIdAndUpdate(
       companyId ,
      { name, description, website, location,logo },
      { new: true }
    );
    if (!company) {
      return res
        .status(400)
        .json({ message: "Company not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Company Information Updated", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error updating company", success: false });
  }
};
