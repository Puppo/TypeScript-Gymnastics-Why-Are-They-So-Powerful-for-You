import { DbClient } from "../db/index";
import { Category } from "../entities/Category";
import { CreateEntity, Filters, IEntityRepository, Pagination, SortingList, UpdateEntity } from "../repositories/IEntityRepository";

export class CategoryDao implements IEntityRepository<Category> {

  constructor(private readonly db: DbClient) {}

  findById(id: string): Promise<Category | null> {
    return this.db.categories
      .as('c')
      .where({ id })
      .leftJoin(this.db.posts.as('p'), 'c.id', 'p.categoryId')
      .select({
        id: 'c.id',
        name: 'c.name',
        description: 'c.description',
        createdAt: 'c.createdAt',
        updatedAt: 'c.updatedAt',
        posts: {
          id: 'p.id',
          title: 'p.title',
          content: 'p.content',
          createdAt: 'p.createdAt',
          updatedAt: 'p.updatedAt',
        }
      })
      .firstOrDefault();
  }
  async create(entity: CreateEntity<Category>): Promise<void> {
    await this.db.categories.insert(entity);
  }
  async delete(id: string): Promise<void> {
    await this.db.categories.where({ id }).delete();
  }
  async update(id: string, entity: UpdateEntity<Category>): Promise<void> {
    await this.db.categories.where({ id }).update(entity);
  }
  findAll(filter: Filters<Category>, pagination: Pagination, sorting: SortingList<Category>): Promise<Category[]> {
    return this.db.categories.as('cat')
    .leftJoin(this.db.posts.as('po'), 'cat.id', 'po.categoryId')
    .where(filter)
    .limit(pagination.limit)
    .offset(pagination.offset)
    .sorting(sorting)
    .select({
      id: 'cat.id',
      name: 'cat.name',
      description: 'cat.description',
      createdAt: 'cat.createdAt',
      updatedAt: 'cat.updatedAt',
      posts: {
        id: 'po.id',
        title: 'po.title',
        content: 'po.content',
        createdAt: 'po.createdAt',
        updatedAt: 'po.updatedAt',
      }
    })
    .all();
  }
}