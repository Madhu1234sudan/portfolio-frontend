"use client";

import { useState } from "react";

import api from "@/src/lib/api";

import LoadingButton from "../ui/LoadingButton";
import { Experience } from "@/src/types/experience";
import AdminCard from "./common/AdminCard";
import AdminSectionHeader from "./common/AdminSectionHeader";
import AdminInput from "./common/AdminInput";
import AdminTextarea from "./common/AdminTextarea";
import AdminFileUpload from "./common/AdminFileUpload";
interface AddExperienceFormProps {
  setExperiences: React.Dispatch<
    React.SetStateAction<Experience[]>
  >;
}
export default function AddExperienceForm({
  setExperiences,
}: AddExperienceFormProps) {
const [company, setCompany] = useState("");

const [position, setPosition] = useState("");

const [location, setLocation] = useState("");

const [startDate, setStartDate] = useState("");

const [endDate, setEndDate] = useState("");

const [currentlyWorking,setCurrentlyWorking,] = useState(false);

const [description,setDescription,] = useState("");

const [displayOrder,setDisplayOrder,] = useState(1);

const [logoFile,setLogoFile,] = useState<File | null>(null);

const [uploadingLogo,setUploadingLogo,] = useState(false);

const [loading, setLoading] = useState(false);

const [success, setSuccess] = useState("");

const [error, setError] = useState("");

const uploadLogo = async () => {
  if (!logoFile) {
    return "";
  }

  try {
    setUploadingLogo(true);

    const formData =
      new FormData();

    formData.append(
      "image",
      logoFile
    );

    const response =
    
      await api.post(
        "/upload/image",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data.imageUrl;

  } finally {
    setUploadingLogo(false);
  }
};
const handleCreate = async () => {
  try {
    setLoading(true);

    setError("");
    setSuccess("");
    if (!company.trim()) {
  setError("Company is required.");
  return;
}

if (!position.trim()) {
  setError("Position is required.");
  return;
}

if (!startDate) {
  setError("Start Date is required.");
  return;
}

if (!description.trim()) {
  setError("Description is required.");
  return;
}

    const logoUrl =
      await uploadLogo();

    const token =
      sessionStorage.getItem(
        "adminToken"
      );

    const response =
      await api.post(
        "/experience",
        {
          company,
          position,
          location,
          startDate,
          endDate: currentlyWorking
            ? null
            : endDate,
          currentlyWorking,
          description,
          companyLogo: logoUrl,
          displayOrder,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setExperiences(
  (prev: Experience[]) => [
    ...prev,
    response.data,
  ]
);
    

    setCompany("");
    setPosition("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setCurrentlyWorking(false);
    setDescription("");
    setDisplayOrder(1);
    setLogoFile(null);

    setSuccess(
      "Experience added successfully."
    );

  } catch (error) {
    console.error(error);

    setError(
      "Failed to create experience."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <AdminCard>
      <AdminSectionHeader
  title="Add Experience"
  subtitle="Create and manage your professional experience."
        />
      <div className="space-y-6">

  <AdminInput
  label="Company"
  value={company}
  onChange={(e) =>
    setCompany(e.target.value)
  }
/>
  <AdminInput
  label="Position"
  value={position}
  onChange={(e) =>
    setPosition(e.target.value)
  }
/>

  <AdminInput
  label="Location"
  value={location}
  onChange={(e) =>
    setLocation(e.target.value)
  }
/>

</div>
<div className="grid grid-cols-2 gap-6">

  <AdminInput
  label="Start Date"
  type="date"
  value={startDate}
  onChange={(e) =>
    setStartDate(e.target.value)
  }
/>

  <AdminInput
  label="End Date"
  type="date"
  value={endDate}
  disabled={currentlyWorking}
  onChange={(e) =>
    setEndDate(e.target.value)
  }
/>

</div>
<AdminTextarea
  label="Description"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>
<AdminFileUpload
  label="Company Logo"
  accept="image/*"
  preview={
    logoFile
      ? URL.createObjectURL(logoFile)
      : null
  }
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setLogoFile(e.target.files[0]);
    }
  }}
/>
<div className="grid grid-cols-2 gap-6">
<div>
  <label
    className="
    block
    mb-2
    font-medium
    "
  >
    Display Order
  </label>

  <input
    type="number"
    value={displayOrder}
    onChange={(e) =>
      setDisplayOrder(
        Number(e.target.value)
      )
    }
    className="
    w-full
    rounded-xl
    border
    border-zinc-300
    dark:border-zinc-700
    bg-zinc-100
    dark:bg-black
    px-4
    py-3
    "
  />
</div>
</div>

{error && (
  <p className="text-red-500">
    {error}
  </p>
)}

{success && (
  <p className="text-green-500">
    {success}
  </p>
)}
<LoadingButton
  type="button"
  loading={
    loading ||
    uploadingLogo
  }
  onClick={handleCreate}
  className="
  bg-green-500
  hover:bg-green-400
  px-6
  py-3
  rounded-xl
  text-black
  font-semibold
  "
>
  Add Experience
</LoadingButton>
    </AdminCard>
  );
}
