import { CategoryDao } from "./daos/CategoryDao";
import { PostDao } from "./daos/PostDao";
import { DbClient } from "./db/index";
import { Category } from "./entities/Category";
import { IEntityRepository } from "./repositories/IEntityRepository";
import { IPostRepository } from "./repositories/IPostRepository";

declare const dbClient: DbClient;

const categoryRepository: IEntityRepository<Category> = new CategoryDao(dbClient);
const postRepository: IPostRepository = new PostDao(dbClient);

await categoryRepository.create({
  name: 'Category 1',
  description: 'Description 1',
})
await categoryRepository.findAll({ id: ['1', '2'],}, { limit: 10, offset: 0 }, [{ fieldName: 'name', order: 'asc' }]);
await categoryRepository.findById('1');
await categoryRepository.delete('1');
await categoryRepository.update('1', { name: 'Category 2' });

await postRepository.create({
  title: 'Post 1',
  content: 'Content 1',
})
await postRepository.associateCategory('1', '1');
await postRepository.findAll({ id: ['1', '2'],}, { limit: 10, offset: 0 }, [{ fieldName: 'title', order: 'asc' }]);
await postRepository.findById('1');
await postRepository.delete('1');
await postRepository.update('1', { title: 'Post 2' });
await postRepository.findByCategoryId('1');

