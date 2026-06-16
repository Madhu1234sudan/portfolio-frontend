"use client";

import { useEffect, useState } from "react";

import api from "../../lib/api";

import LoadingButton from "../ui/LoadingButton";

import { Profile } from "../../types/profile";

import Image from "next/image";

export default function ProfileManagement() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

    const [imageFile, setImageFile] =
  useState<File | null>(null);

const [uploadingImage,
  setUploadingImage] =
  useState(false);

const fetchProfile = async () => {
    try {
      const response =
        await api.get("/profile");

      setProfile(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  
const uploadImage = async () => {
  if (!imageFile) {
    return profile?.profileImage || "";
  }

  try {
    setUploadingImage(true);

    const formData =
      new FormData();

    formData.append(
      "image",
      imageFile
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
    setUploadingImage(false);
  }
};
  const handleSave = async () => {
  if (!profile) return;

  try {
    setSaving(true);

    setError("");
    setSuccess("");

    const uploadedImageUrl =
      await uploadImage();

    const token =
      sessionStorage.getItem(
        "adminToken"
      );

    await api.put(
      "/profile",
      {
        ...profile,
        profileImage:
          uploadedImageUrl,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setSuccess(
      "Profile updated successfully."
    );

    await fetchProfile();

  } catch (error) {
    console.error(error);

    setError(
      "Failed to update profile."
    );
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="p-8">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8">
        No profile found.
      </div>
    );
  }
  console.log(
  "PROFILE IMAGE:",
  profile?.profileImage
);
  return (
    <div className="p-8">
      <div
        className="
        bg-white
        dark:bg-zinc-900
        border
        border-zinc-300
        dark:border-zinc-800
        rounded-2xl
        p-8
        "
      >
        <h2
          className="
          text-3xl
          font-bold
          text-black
          dark:text-white
          mb-8
          "
        >
          Profile Management
        </h2>
        <div>
  <label
    className="
    block
    text-black
    dark:text-white
    mb-2
    font-medium
    "
  >
    Profile Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        setImageFile(
          e.target.files[0]
        );
      }
    }}
    className="
    w-full
    cursor-pointer
    px-4
    py-3
    rounded-xl
    bg-zinc-100
    dark:bg-black
    border
    border-zinc-300
    dark:border-zinc-700
    "
  />
</div>
{imageFile && (
  <Image
    src={URL.createObjectURL(
      imageFile
    )}
    alt="Preview"
    width={200}
    height={200}
    className="
    h-40
    w-40
    object-cover
    rounded-full
    border
    border-zinc-300
    dark:border-zinc-700
    "
  />
)}
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={(e) =>
              setProfile({
                ...profile,
                fullName:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700"
          />

          <input
            type="text"
            placeholder="Headline"
            value={profile.headline}
            onChange={(e) =>
              setProfile({
                ...profile,
                headline:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700"
          />

          <textarea
            placeholder="Short Bio"
            value={profile.shortBio}
            onChange={(e) =>
              setProfile({
                ...profile,
                shortBio:
                  e.target.value,
              })
            }
            className="w-full h-24 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700"
          />

          <textarea
            placeholder="About Me"
            value={profile.aboutMe}
            onChange={(e) =>
              setProfile({
                ...profile,
                aboutMe:
                  e.target.value,
              })
            }
            className="w-full h-40 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700"
          />

          <input
            type="text"
            placeholder="Email"
            value={profile.email || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                email:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700"
          />

          <input
            type="text"
            placeholder="Location"
            value={
              profile.location || ""
            }
            onChange={(e) =>
              setProfile({
                ...profile,
                location:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700"
          />

          <input
            type="text"
            placeholder="GitHub URL"
            value={
              profile.githubUrl || ""
            }
            onChange={(e) =>
              setProfile({
                ...profile,
                githubUrl:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700"
          />

          <input
            type="text"
            placeholder="LinkedIn URL"
            value={
              profile.linkedinUrl || ""
            }
            onChange={(e) =>
              setProfile({
                ...profile,
                linkedinUrl:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700"
          />

          <input
            type="text"
            placeholder="Kaggle URL"
            value={
              profile.kaggleUrl || ""
            }
            onChange={(e) =>
              setProfile({
                ...profile,
                kaggleUrl:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700"
          />

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
            saving ||
            uploadingImage
            }
            onClick={handleSave}
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
            Save Profile
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}