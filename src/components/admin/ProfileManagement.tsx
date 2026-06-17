"use client";

import { useEffect, useState } from "react";

import api from "../../lib/api";

import LoadingButton from "../ui/LoadingButton";

import { Profile } from "../../types/profile";

import Image from "next/image";

export default function ProfileManagement() {
  const [profile, setProfile] =    useState<Profile | null>(null);

  const [loading, setLoading] =    useState(true);

  const [saving, setSaving] =    useState(false);

  const [success, setSuccess] =    useState("");

  const [error, setError] =    useState("");

    const [imageFile, setImageFile] =  useState<File | null>(null);

const [uploadingImage,  setUploadingImage] =  useState(false);

  const [resumeFile, setResumeFile] =  useState<File | null>(null);

const [uploadingResume,  setUploadingResume] =  useState(false);

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
const uploadResume = async () => {
  if (!resumeFile) {
    return profile?.resumeUrl || "";
  }

  try {
    setUploadingResume(true);

    const formData = new FormData();

    formData.append(
      "pdf",
      resumeFile
    );

    const response =
      await api.post(
        "/upload/pdf",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data.pdfUrl;

  } finally {
    setUploadingResume(false);
  }
};
  const handleSave = async () => {
  if (!profile) return;
  if (
  !profile.fullName.trim() ||
  !profile.headline.trim() ||
  !profile.shortBio.trim() ||
  !profile.aboutMe.trim()
) {
  setError(
    "Please complete all required fields."
  );
  return;
}

  try {
    setSaving(true);

    setError("");
    setSuccess("");

    const uploadedImageUrl =  await uploadImage();

    const uploadedResumeUrl = await uploadResume();

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

  resumeUrl:
    uploadedResumeUrl,
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

setTimeout(() => {
  setSuccess("");
}, 3000);

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
      max-w-7xl
      mx-auto
      bg-white
      dark:bg-zinc-900
      border
      border-zinc-300
      dark:border-zinc-800
      rounded-3xl
      shadow-xl
      overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
        px-10
        py-8
        border-b
        border-zinc-300
        dark:border-zinc-800
        "
      >
        <h2 className="text-4xl font-bold text-black dark:text-white">
          Profile Management
        </h2>

        <p className="text-zinc-500 mt-2">
          Manage your portfolio profile information.
        </p>
      </div>

      <div className="p-10 space-y-12">

        {/* ========================= */}
        {/* PROFILE IMAGE */}
        {/* ========================= */}

        <section className="space-y-6">

          <div className="border-b border-zinc-300 dark:border-zinc-700 pb-3">
            <h3 className="text-2xl font-bold text-black dark:text-white">
              Profile Image
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Upload your professional profile photograph.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-center">

            <div
              className="
              w-56
              h-56
              rounded-full
              overflow-hidden
              border-4
              border-green-500
              bg-zinc-100
              dark:bg-black
              flex
              items-center
              justify-center
              "
            >
              {imageFile ? (

                <Image
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />

              ) : profile.profileImage ? (

                <Image
                  src={profile.profileImage}
                  alt={profile.fullName}
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="text-center">

                  <div className="text-6xl font-black text-green-500">
                    {profile.fullName
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <p className="text-zinc-500 text-sm mt-2">
                    No Image
                  </p>

                </div>

              )}
            </div>

            <div className="flex-1 space-y-5">

              <div>

                <label
                  className="
                  block
                  text-sm
                  font-semibold
                  text-black
                  dark:text-white
                  mb-2
                  "
                >
                  Upload New Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
  const file =
    e.target.files?.[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (
    !allowedTypes.includes(file.type)
  ) {
    setError(
      "Only JPG, PNG and WEBP images are allowed."
    );
    return;
  }

  if (
    file.size >
    5 * 1024 * 1024
  ) {
    setError(
      "Image size must be under 5 MB."
    );
    return;
  }

  setError("");

  setImageFile(file);
}}
                  className="
                  w-full
                  cursor-pointer
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

              <p className="text-sm text-zinc-500 leading-7">
                Recommended image size:
                <strong> 600 × 600</strong>
                <br />
                JPG, PNG or WEBP.
              </p>

            </div>

          </div>

        </section>
        {/* ========================= */}
        {/* RESUME UPLOAD */}
        {/* ========================= */}
        <div className="space-y-3">

  <label
    className="
    block
    text-black
    dark:text-white
    font-semibold
    "
  >
    Resume (PDF)
  </label>

  {profile.resumeUrl && (
  <button
    type="button"
    onClick={() =>
      window.open(
        profile.resumeUrl!,
        "_blank"
      )
    }
    className="
    mt-2
    px-4
    py-2
    rounded-lg
    bg-zinc-800
    text-white
    hover:bg-zinc-700
    "
  >
    View Current Resume
  </button>
)}

  <input
    type="file"
    accept=".pdf"
    onChange={(e) => {
  const file =
    e.target.files?.[0];

  if (!file) return;

  if (
    file.type !==
    "application/pdf"
  ) {
    setError(
      "Only PDF resumes are allowed."
    );
    return;
  }

  if (
    file.size >
    10 * 1024 * 1024
  ) {
    setError(
      "Resume must be under 10 MB."
    );
    return;
  }

  setError("");

  setResumeFile(file);
}}
    className="
    w-full
    cursor-pointer
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

  {resumeFile && (
    <p className="text-sm text-green-500">
      Selected:
      {" "}
      {resumeFile.name}
    </p>
  )}

</div>
        {/* ========================= */}
        {/* BASIC INFORMATION */}
        {/* ========================= */}

        <section className="space-y-8">

          <div className="border-b border-zinc-300 dark:border-zinc-700 pb-3">

            <h3 className="text-2xl font-bold text-black dark:text-white">
              Basic Information
            </h3>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="space-y-2">

              <label className="font-semibold">
                Full Name
              </label>

              <input
                type="text"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    fullName: e.target.value,
                  })
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

            <div className="space-y-2">

              <label className="font-semibold">
                Professional Headline
              </label>

              <input
                type="text"
                value={profile.headline}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    headline: e.target.value,
                  })
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

          <div className="space-y-2">

            <label className="font-semibold">
              Short Bio
            </label>

            <textarea
              value={profile.shortBio}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  shortBio: e.target.value,
                })
              }
              className="
              w-full
              h-28
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
          </section>
          {/* ========================= */}
          {/* ABOUT */}
          {/* ========================= */}

          <section className="space-y-8">

            <div className="border-b border-zinc-300 dark:border-zinc-700 pb-3">
              <h3 className="text-2xl font-bold text-black dark:text-white">
                About
              </h3>
            </div>

            <div className="space-y-2">

              <label className="font-semibold">
                About Me
              </label>

              <textarea
                value={profile.aboutMe}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    aboutMe: e.target.value,
                  })
                }
                className="
                w-full
                h-56
                rounded-xl
                border
                border-zinc-300
                dark:border-zinc-700
                bg-zinc-100
                dark:bg-black
                px-4
                py-3
                resize-none
                "
              />

            </div>

          </section>

          {/* ========================= */}
          {/* CONTACT */}
          {/* ========================= */}

          <section className="space-y-8">

            <div className="border-b border-zinc-300 dark:border-zinc-700 pb-3">
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Contact Information
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="space-y-2">

                <label className="font-semibold">
                  Email
                </label>

                <input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      email: e.target.value,
                    })
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

              <div className="space-y-2">

                <label className="font-semibold">
                  Location
                </label>

                <input
                  type="text"
                  value={profile.location || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      location: e.target.value,
                    })
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

          </section>

          {/* ========================= */}
          {/* SOCIAL LINKS */}
          {/* ========================= */}

          <section className="space-y-8">

            <div className="border-b border-zinc-300 dark:border-zinc-700 pb-3">
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Social Profiles
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="space-y-2">

                <label className="font-semibold">
                  GitHub
                </label>

                <input
                  type="text"
                  value={profile.githubUrl || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      githubUrl: e.target.value,
                    })
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

              <div className="space-y-2">

                <label className="font-semibold">
                  LinkedIn
                </label>

                <input
                  type="text"
                  value={profile.linkedinUrl || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      linkedinUrl: e.target.value,
                    })
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

              <div className="space-y-2">

                <label className="font-semibold">
                  Kaggle
                </label>

                <input
                  type="text"
                  value={profile.kaggleUrl || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      kaggleUrl: e.target.value,
                    })
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

              <div className="space-y-2">

                <label className="font-semibold">
                  Twitter / X
                </label>

                <input
                  type="text"
                  value={profile.twitterUrl || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      twitterUrl: e.target.value,
                    })
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

          </section>
                    {/* ========================= */}
          {/* RESUME */}
          {/* ========================= */}

          {/* <section className="space-y-8">

            <div className="border-b border-zinc-300 dark:border-zinc-700 pb-3">
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Resume
              </h3>
            </div>

            <div className="space-y-2">

              <label className="font-semibold">
                Resume URL
              </label>

              <input
                type="text"
                value={profile.resumeUrl || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    resumeUrl: e.target.value,
                  })
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

          </section> */}

          {/* ========================= */}
          {/* STATUS */}
          {/* ========================= */}

          {(error || success) && (

            <div className="space-y-4">

              {error && (

                <div
                  className="
                  rounded-xl
                  border
                  border-red-500/30
                  bg-red-500/10
                  px-5
                  py-4
                  text-red-500
                  "
                >
                  {error}
                </div>

              )}

              {success && (
  <div
    className="
    rounded-xl
    border
    border-green-300
    bg-green-50
    px-4
    py-3
    text-green-700
    font-medium
    "
  >
    ✓ {success}
  </div>
)}

            </div>

          )}

        </div>

        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}

        <div
          className="
          px-10
          py-6
          border-t
          border-zinc-300
          dark:border-zinc-800
          bg-zinc-50
          dark:bg-zinc-950
          flex
          justify-end
          "
        >

          <LoadingButton
  type="button"
  loading={
    saving ||
    uploadingImage ||
    uploadingResume
  }
  disabled={
    saving ||
    uploadingImage ||
    uploadingResume
  }
  onClick={handleSave}
            className="
            px-8
            py-3
            rounded-xl
            bg-green-500
            hover:bg-green-400
            text-black
            font-bold
            shadow-lg
            shadow-green-500/20
            transition-all
            duration-300
            "
          >
            Save Changes
          </LoadingButton>
        
        </div>
      
      </div>

    </div>

  );
}