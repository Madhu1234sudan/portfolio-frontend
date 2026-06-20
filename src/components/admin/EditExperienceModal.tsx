"use client";

import { useEffect, useState } from "react";

import api from "@/src/lib/api";

import LoadingButton from "../ui/LoadingButton";

import { Experience } from "@/src/types/experience";

interface EditExperienceModalProps {
  open: boolean;

  onClose: () => void;

  experience: Experience | null;

  setExperiences: React.Dispatch<React.SetStateAction<Experience[]> >;
}

export default function EditExperienceModal({
  open,
  onClose,
  experience,
  setExperiences,
}: EditExperienceModalProps) {

  const [company, setCompany] =
    useState("");

  const [position, setPosition] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [
    currentlyWorking,
    setCurrentlyWorking,
  ] = useState(false);

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    displayOrder,
    setDisplayOrder,
  ] = useState(1);

  const [
    logoFile,
    setLogoFile,
  ] = useState<File | null>(null);

  const [
    uploadingLogo,
    setUploadingLogo,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");
      useEffect(() => {

    if (!experience) {
      return;
    }

    setCompany(
      experience.company
    );

    setPosition(
      experience.position
    );

    setLocation(
      experience.location || ""
    );

    setStartDate(
      experience.startDate
        .substring(0, 10)
    );

    setEndDate(
      experience.endDate
        ? experience.endDate.substring(0, 10)
        : ""
    );

    setCurrentlyWorking(
      experience.currentlyWorking
    );

    setDescription(
      experience.description
    );

    setDisplayOrder(
      experience.displayOrder
    );

    setLogoFile(null);

  }, [experience]);
    if (
    !open ||
    !experience
  ) {
    return null;
  }
  const uploadLogo = async () => {
  if (!logoFile) {
    return experience.companyLogo || "";
  }

  try {
    setUploadingLogo(true);

    const formData = new FormData();

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
const handleUpdate = async () => {
  try {

    setLoading(true);

    setError("");
    setSuccess("");

    const companyLogo =
      await uploadLogo();

    const token =
      sessionStorage.getItem(
        "adminToken"
      );

    const response =
      await api.put(
        `/experience/${experience.id}`,
        {
          company,
          position,
          location,
          startDate,
          endDate:
            currentlyWorking
              ? null
              : endDate,
          currentlyWorking,
          description,
          companyLogo,
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
      (
        prev: Experience[]
      ) =>
        prev.map((item) =>
          item.id === experience.id
            ? response.data
            : item
        )
    );

    setSuccess(
      "Experience updated successfully."
    );

    onClose();

  } catch (error) {

    console.error(error);

    setError(
      "Failed to update experience."
    );

  } finally {

    setLoading(false);

  }
};
return (
  <div
    className="
    fixed
    inset-0
    z-50
    flex
    items-center
    justify-center
    bg-black/60
    backdrop-blur-sm
    "
  >
    <div
      className="
      w-full
      max-w-3xl
      max-h-[90vh]
      overflow-y-auto
      rounded-2xl
      bg-white
      dark:bg-zinc-900
      border
      border-zinc-300
      dark:border-zinc-800
      p-8
      "
    >
      <h2
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Edit Experience
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

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
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

          <div>
            <label className="block mb-2 font-medium">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              disabled={
                currentlyWorking
              }
              onChange={(e) =>
                setEndDate(
                  e.target.value
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

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={
              currentlyWorking
            }
            onChange={(e) =>
              setCurrentlyWorking(
                e.target.checked
              )
            }
          />

          Currently Working Here

        </label>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
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

        <div>
          <label className="block mb-2 font-medium">
            Company Logo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (
                e.target.files?.[0]
              ) {
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

        {(logoFile ||
          experience.companyLogo) && (
          <img
            src={
              logoFile
                ? URL.createObjectURL(
                    logoFile
                  )
                : experience.companyLogo!
            }
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
          <label className="block mb-2 font-medium">
            Display Order
          </label>

          <input
            type="number"
            value={displayOrder}
            onChange={(e) =>
              setDisplayOrder(
                Number(
                  e.target.value
                )
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

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="
            px-6
            py-3
            rounded-xl
            border
            border-zinc-300
            dark:border-zinc-700
            "
          >
            Cancel
          </button>

          <LoadingButton
            type="button"
            loading={
              loading ||
              uploadingLogo
            }
            disabled={
              loading ||
              uploadingLogo
            }
            onClick={handleUpdate}
            className="
            bg-blue-500
            hover:bg-blue-400
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            "
          >
            Save Changes
          </LoadingButton>

        </div>

      </div>

    </div>
  </div>
);
}