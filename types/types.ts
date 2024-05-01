import { ProjectSourceType } from "./enums";

export interface ProjectSource {
  type: ProjectSourceType;
  github?: {
    repo: string;
    branch: string;
  }
}