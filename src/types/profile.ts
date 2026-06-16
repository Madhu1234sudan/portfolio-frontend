export interface Profile {
  id: number;

  fullName: string;

  headline: string;

  shortBio: string;

  aboutMe: string;

  profileImage: string | null;

  resumeUrl: string | null;

  email: string | null;

  location: string | null;

  githubUrl: string | null;

  linkedinUrl: string | null;

  kaggleUrl: string | null;

  twitterUrl: string | null;

  createdAt: string;
  updatedAt: string;
}