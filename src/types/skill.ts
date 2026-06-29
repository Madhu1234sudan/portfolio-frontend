export interface Skill {
  id: number;

  name: string;

  level: number | null;

  icon: string | null;

  order: number;

  featured: boolean;

  categoryId: number;

  category: {
    id: number;

    title: string;

    icon: string | null;

    order: number;

    createdAt: string;
  };

  createdAt: string;
}