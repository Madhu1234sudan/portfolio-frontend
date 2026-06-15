export interface Research {
  id: number;

  title: string;
  abstract: string;
  description: string;

  researchImage: string | null;

  pdfUrl: string | null;
  githubUrl: string | null;
  publicationUrl: string | null;

  tags: string[];

  featured: boolean;

  createdAt: string;
}