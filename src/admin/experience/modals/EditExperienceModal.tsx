"use client";

import { useEffect, useState } from "react";

import api from "@/src/lib/api";

import Modal from "@/src/dialogs/Modal";

import AdminInput from "@/src/common/AdminInput";
import AdminTextarea from "@/src/common/AdminTextarea";
import AdminFileUpload from "@/src/common/AdminFileUpload";

import { PrimaryButton } from "@/src/buttons/PrimaryButton";
import { SecondaryButton } from "@/src/buttons/SecondaryButton";

import { Experience } from "@/src/types/experience";

interface EditExperienceModalProps {
  open: boolean;

  onClose: () => void;

  experience: Experience | null;

  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}

export default function EditExperienceModal({
  open,
  onClose,
  experience,
  setExperiences,
}: EditExperienceModalProps) {
  const [company, setCompany] = useState("");

  const [position, setPosition] = useState("");

  const [location, setLocation] = useState("");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  const [description, setDescription] = useState("");

  const [displayOrder, setDisplayOrder] = useState(1);

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!experience) {
      return;
    }

    setCompany(experience.company);

    setPosition(experience.position);

    setLocation(experience.location || "");

    setStartDate(experience.startDate.substring(0, 10));

    setEndDate(experience.endDate ? experience.endDate.substring(0, 10) : "");

    setCurrentlyWorking(experience.currentlyWorking);

    setDescription(experience.description);

    setDisplayOrder(experience.displayOrder);

    setLogoFile(null);
  }, [experience]);
  if (!open || !experience) {
    return null;
  }
  const uploadLogo = async () => {
    if (!logoFile) {
      return experience.companyLogo || "";
    }

    try {
      setUploadingLogo(true);

      const formData = new FormData();

      formData.append("image", logoFile);

      const response = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

      const companyLogo = await uploadLogo();

      const token = sessionStorage.getItem("adminToken");

      const response = await api.put(
        `/experience/${experience.id}`,
        {
          company,
          position,
          location,
          startDate,
          endDate: currentlyWorking ? null : endDate,
          currentlyWorking,
          description,
          companyLogo,
          displayOrder,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setExperiences((prev: Experience[]) =>
        prev.map((item) => (item.id === experience.id ? response.data : item)),
      );

      setSuccess("Experience updated successfully.");

      onClose();
    } catch (error) {
      console.error(error);

      setError("Failed to update experience.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal open={open} title="Edit Experience" onClose={onClose}>
      <div className="space-y-6">
        <AdminInput
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <AdminInput
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <AdminInput
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-6">
          <AdminInput
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <AdminInput
            label="End Date"
            type="date"
            value={endDate}
            disabled={currentlyWorking}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <label
          className="
  flex
  items-center
  gap-3
  "
        >
          <input
            type="checkbox"
            checked={currentlyWorking}
            onChange={(e) => setCurrentlyWorking(e.target.checked)}
          />
          Currently Working Here
        </label>

        <AdminTextarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <AdminFileUpload
          label="Company Logo"
          accept="image/*"
          preview={
            logoFile ? URL.createObjectURL(logoFile) : experience.companyLogo
          }
          onChange={(file) => {
            if (!file) return;

            setLogoFile(file);
          }}
        />

        <AdminInput
          label="Display Order"
          type="number"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(Number(e.target.value))}
        />

        {error && <p className="text-red-500">{error}</p>}

        {success && <p className="text-green-500">{success}</p>}

        <SecondaryButton type="button" onClick={onClose}>
          Cancel
        </SecondaryButton>

        <PrimaryButton
          type="button"
          disabled={loading || uploadingLogo}
          onClick={handleUpdate}
        >
          {loading || uploadingLogo ? "Saving..." : "Save Changes"}
        </PrimaryButton>
      </div>
    </Modal>
  );
}
