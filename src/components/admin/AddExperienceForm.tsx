"use client";

import { useState } from "react";

import api from "@/src/lib/api";

import LoadingButton from "../ui/LoadingButton";
import { Experience } from "@/src/types/experience";
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
    <div
      className="
      rounded-2xl
      border
      border-zinc-300
      dark:border-zinc-800
      bg-white
      dark:bg-zinc-900
      p-8
      "
    >
      <h2
        className="
        mb-8
        text-3xl
        font-bold
        text-black
        dark:text-white
        "
      >
        Add Experience
      </h2>
      <div className="space-y-6">

  <div>
    <label className="block mb-2 font-medium">
      Company
    </label>

    <input
      type="text"
      value={company}
      onChange={(e) =>
        setCompany(e.target.value)
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

  <div>
    <label className="block mb-2 font-medium">
      Position
    </label>

    <input
      type="text"
      value={position}
      onChange={(e) =>
        setPosition(e.target.value)
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

  <div>
    <label className="block mb-2 font-medium">
      Location
    </label>

    <input
      type="text"
      value={location}
      onChange={(e) =>
        setLocation(e.target.value)
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
<div className="grid grid-cols-2 gap-6">

  <div>
    <label className="block mb-2 font-medium">
      Start Date
    </label>

    <input
      type="date"
      value={startDate}
      onChange={(e) =>
        setStartDate(e.target.value)
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

  <div>
    <label className="block mb-2 font-medium">
      End Date
    </label>

    <input
      type="date"
      value={endDate}
      disabled={currentlyWorking}
      onChange={(e) =>
        setEndDate(e.target.value)
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
<div>
  <label
    className="
    block
    mb-2
    font-medium
    "
  >
    Description
  </label>

  <textarea
    value={description}
    onChange={(e) =>
      setDescription(e.target.value)
    }
    rows={6}
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
<div>
  <label
    className="
    block
    mb-2
    font-medium
    "
  >
    Company Logo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        setLogoFile(
          e.target.files[0]
        );
      }
    }}
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
{logoFile && (
  <img
    src={URL.createObjectURL(
      logoFile
    )}
    alt="Company Logo"
    className="
    h-24
    w-24
    rounded-xl
    object-cover
    border
    border-zinc-300
    dark:border-zinc-700
    "
  />
)}
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
    </div>
  );
}
