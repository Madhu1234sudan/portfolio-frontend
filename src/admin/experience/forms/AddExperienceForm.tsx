"use client";

import { useState } from "react";
import api from "@/src/lib/api";
import { Experience } from "@/src/types/experience";
import AdminCard from "@/src/common/AdminCard";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import AdminInput from "@/src/common/AdminInput";
import AdminTextarea from "@/src/common/AdminTextarea";
import AdminFileUpload from "@/src/common/AdminFileUpload";
import AddButton from "@/src/buttons/AddButton";

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
        <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
<div className="flex items-center gap-3">
  <input
    id="currentlyWorking"
    type="checkbox"
    checked={currentlyWorking}
    onChange={(e) => {
      setCurrentlyWorking(e.target.checked);

      if (e.target.checked) {
        setEndDate("");
      }
    }}
    className="
      h-4
      w-4
      rounded
      border-zinc-300
      text-emerald-600
    "
  />

  <label
    htmlFor="currentlyWorking"
    className="text-sm font-medium"
  >
    I currently work here
  </label>
</div>
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

  {!currentlyWorking && (
  <AdminInput
    label="End Date"
    type="date"
    value={endDate}
    onChange={(e) =>
      setEndDate(e.target.value)
    }
  />
)}

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
  preview={logoFile ? URL.createObjectURL(logoFile) : null}
  onChange={(file) => {
    if (!file) return;
    setLogoFile(file);
  }}
/>
<div className="grid grid-cols-2 gap-6">
<AdminInput
  label="Display Order"
  type="number"
  value={displayOrder}
  onChange={(e) =>
    setDisplayOrder(Number(e.target.value))
  }
/>
</div>

{error && (
  <p className="text-sm font-medium text-[var(--danger)]">
    {error}
  </p>
)}

{success && (
  <p className="text-sm font-medium text-[var(--success)]">
    {success}
  </p>
)}
<div className="flex justify-start pt-2">
  <AddButton
  loading={loading || uploadingLogo}
  onClick={handleCreate}
>
  Add Experience
</AddButton>
</div>
</form>
    </AdminCard>
  );
}
