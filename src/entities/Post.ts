import { Entity } from "./Entity";

export interface Post extends Entity {
  id: string;
  title: string;
  content: string;
}