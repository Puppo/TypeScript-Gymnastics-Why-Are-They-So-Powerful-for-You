import { DbClient } from "../db/index";
import { Post } from "../entities/Post";
import { CreateEntity, Filters, Pagination, SortingList, UpdateEntity } from "../repositories/IEntityRepository";
import { IPostRepository } from "../repositories/IPostRepository";

export class PostDao implements IPostRepository {

  constructor(private readonly db: DbClient) {}

  findById(id: string): Promise<Post | null> {
    return this.db.posts
    .as('p')
    .where({ id })
    .select({
      id: 'p.id',
      title: 'p.title',
      content: 'p.content',
      createdAt: 'p.createdAt',
      updatedAt: 'p.updatedAt',
    })
    .firstOrDefault();
  }
  async create(entity: CreateEntity<Post>): Promise<void> {
    await this.db.posts.insert(entity);
  }
  async delete(id: string): Promise<void> {
    await this.db.posts.where({ id }).delete();
  }
  async update(id: string, entity: UpdateEntity<Post>): Promise<void> {
    await this.db.posts.where({ id }).update(entity);
  }
  findAll(filter: Filters<Post>, pagination: Pagination, sorting: SortingList<Post>): Promise<Post[]> {
    return this.db.posts.as('p')
    .where(filter)
    .limit(pagination.limit)
    .offset(pagination.offset)
    .sorting(...sorting.map(({ fieldName, order }) => ({ fieldName: `p.${fieldName}`, order } as const)))
    .select({
      id: 'p.id',
      title: 'p.title',
      content: 'p.content',
      createdAt: 'p.createdAt',
      updatedAt: 'p.updatedAt',
    })
    .all();
  }
  findByCategoryId(categoryId: string): Promise<Post[]> {
    return this.db.posts
    .as('p')
    .where({ categoryId })
    .select({
      id: 'p.id',
      title: 'p.title',
      content: 'p.content',
      createdAt: 'p.createdAt',
      updatedAt: 'p.updatedAt',
    })
    .all();
  }
  async associateCategory(postId: string, categoryId: string): Promise<void> {
    await this.db.posts
    .where({ id: postId })
    .update({ categoryId });
  }
}