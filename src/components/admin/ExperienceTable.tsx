"use client";

import { useState } from "react";

import api from "@/src/lib/api";

import { Experience } from "@/src/types/experience";

import {
  Search,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

interface ExperienceTableProps {
  experiences: Experience[];

  setExperiences: React.Dispatch<
    React.SetStateAction<Experience[]>
  >;

  setEditingExperience: React.Dispatch<
    React.SetStateAction<Experience | null>
  >;

  setEditExperienceOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function ExperienceTable({
  experiences,
  setExperiences,
  setEditingExperience,
  setEditExperienceOpen,
}: ExperienceTableProps) {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredExperiences =
    experiences.filter((experience) =>
      experience.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      experience.position
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      (experience.location || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const handleDelete = async (
    id: number
  ) => {

    const confirmed =
      window.confirm(
        "Delete this experience?"
      );

    if (!confirmed) {
      return;
    }

    try {

      const token = sessionStorage.getItem("adminToken");

      await api.delete(
        `/experience/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setExperiences((prev) =>
        prev.filter(
          (experience) =>
            experience.id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete experience."
      );

    }
       
  };
  return (
  <div className="p-8">

    <div className="mb-6">

      <div className="relative w-96">
    <div
  className="
  flex
  items-center
  justify-between
  mb-8
  "
>
  <h2
    className="
    text-3xl
    font-bold
    "
  >
    Experience
  </h2>

  <span
    className="
    text-sm
    text-zinc-500
    "
  >
    {experiences.length} Records
  </span>
</div>
        <Search
  size={18}
  className="
  absolute
  left-4
  top-1/2
  -translate-y-1/2
  text-zinc-500
  "
/>

        <input
          type="text"
          placeholder="Search experience..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="
          w-full
          rounded-xl
          border
          border-zinc-300
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-900
          pl-12
          pr-4
          py-3
          text-black
          dark:text-white
          placeholder:text-zinc-500
          focus:outline-none
          focus:border-green-400
          transition-all
          "
        />

      </div>

    </div>

    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      border-zinc-300
      dark:border-zinc-800
      bg-white
      dark:bg-zinc-900
      shadow-sm
      "
    >

      <table className="w-full min-w-[1000px]">

        <thead
          className="
          bg-zinc-100
          dark:bg-black
          "
        >

          <tr>

            <th className="p-5 text-left">
              Logo
            </th>

            <th className="p-5 text-left">
              Company
            </th>

            <th className="p-5 text-left">
              Position
            </th>

            <th className="p-5 text-left">
              Location
            </th>

            <th className="p-5 text-left">
              Duration
            </th>

            <th className="p-5 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredExperiences.length === 0 ? (

            <tr>

              <div
  className="
  flex
  flex-col
  items-center
  justify-center
  py-10
  gap-3
  "
>
  <Building2
    size={40}
    className="text-zinc-500"
  />

  <p className="text-zinc-500">
    No Experience Added Yet
  </p>
</div>

            </tr>

          ) : (

            filteredExperiences.map(
              (experience) => (

                <tr
                  key={experience.id}
                  className="
                  border-t
                  border-zinc-300
                  dark:border-zinc-800
                  hover:bg-zinc-50
                  dark:hover:bg-zinc-800/30
                  transition-all
                  "
                >

                  <td className="p-5">

                    {experience.companyLogo ? (

                      <img
                        src={
                          experience.companyLogo
                        }
                        alt={
                          experience.company
                        }
                        className="
                        h-14
                        w-14
                        rounded-xl
                        object-contain
                        p-2
                      bg-white
                        border
                        border-zinc-300
                        dark:border-zinc-700
                        "
                      />

                    ) : (

                      <div
                        className="
                        h-14
                        w-14
                        rounded-xl
                        bg-zinc-200
                        dark:bg-zinc-800
                        flex
                        items-center
                        justify-center
                        text-xs
                        text-zinc-500
                        "
                      >
                        Logo
                      </div>

                    )}

                  </td>

                  <td className="p-5 font-medium">

                    {experience.company}

                  </td>

                  <td className="p-5">

                    {experience.position}

                  </td>

                  <td className="p-5">

                    {experience.location || "-"}

                  </td>

                  <td className="p-5">

                    {new Date(
                      experience.startDate
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}

                    {" - "}

                    {experience.currentlyWorking
                      ? "Present"
                      : experience.endDate
                      ? new Date(
                          experience.endDate
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"}

                  </td>

                  <td className="p-5">

                    <div
                      className="
                      flex
                      justify-center
                      gap-3
                      "
                    >
                                           <button
  onClick={() => {
    setEditingExperience(experience);
    setEditExperienceOpen(true);
  }}
  className="
  px-3
  py-2
  rounded-lg
  bg-blue-500
  hover:bg-blue-600
  text-white
  transition-all
  "
>
  <Pencil size={16} />
</button>

                      <button
  onClick={() =>
    handleDelete(experience.id)
  }
  className="
  px-3
  py-2
  rounded-lg
  bg-red-500
  hover:bg-red-600
  text-white
  transition-all
  "
>
  <Trash2 size={16} />
</button>

                    </div>

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>

    </div>

  </div>

);
}
