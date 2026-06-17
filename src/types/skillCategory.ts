import { Skill } from "./skill";

export interface SkillCategory {
  id: number;

  title: string;

  icon: string | null;

  order: number;

  skills: Skill[];

  createdAt: string;
}