export interface Experience {
  id: number;

  company: string;

  position: string;

  location: string | null;

  startDate: string;

  endDate: string | null;

  currentlyWorking: boolean;

  description: string;

  companyLogo: string | null;

  displayOrder: number;

  createdAt: string;

  updatedAt: string;
}