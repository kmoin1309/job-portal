import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating company");
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Create New Company</h1>
          <p className="text-gray-500">
            Fill in the details for your new company.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Company Name *</Label>
            <Input
              type="text"
              name="name"
              className="my-2"
              placeholder="Enter company name"
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              className="my-2"
              placeholder="Company description"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Website</Label>
            <Input
              type="url"
              name="website"
              className="my-2"
              placeholder="Company website"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              className="my-2"
              placeholder="Company location"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Logo URL</Label>
            <Input
              type="url"
              name="logo"
              className="my-2"
              placeholder="Company logo URL"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center gap-2 my-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button onClick={registerNewCompany}>Create Company</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
