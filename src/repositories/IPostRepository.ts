import { Post } from "../entities/Post";
import { IEntityRepository } from "./IEntityRepository";

export interface IPostRepository extends IEntityRepository<Post> {
  findByCategoryId(categoryId: string): Promise<Post[]>;
  associateCategory(postId: string, categoryId: string): Promise<void>;
}