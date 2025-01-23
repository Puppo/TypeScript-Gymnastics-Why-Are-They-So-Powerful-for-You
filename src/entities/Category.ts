import { Entity } from "./Entity";
import { Post } from "./Post";

export interface Category extends Entity {
  name: string;
  description: string;
  posts: Post[];
}