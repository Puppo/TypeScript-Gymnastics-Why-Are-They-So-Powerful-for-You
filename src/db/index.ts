import { CategoryTable } from "./tables/CategoryTable";
import { PostTable } from "./tables/PostTable";

export interface DbClient {
  categories: QueryTable<CategoryTable>;
  posts: QueryTable<PostTable>;
}

type WhereCondition<T> = {
  [P in keyof T]?: T[P] | T[P][];
}
type Select<T> = (keyof T)[] | {
  [key: string]: keyof T | Select<T>;
};
type SelectResult<T, R extends Select<T>> = R extends (keyof T)[] ? Pick<T, R[number]> : {
  [P in keyof R]: R[P] extends keyof T ? T[R[P]] : never;
}
type FirstLeverPropsSortable<T> = {
  [P in keyof T as T[P] extends string | number | Date | boolean ? P : never]: T[P];
};

interface Sorting<T> {
  fieldName: keyof FirstLeverPropsSortable<T>;
  order: 'asc' | 'desc';
}
type SortingList<T> = Sorting<T>[];

type AsResult<T, A extends string> = {
  [P in Extract<keyof T, string> as `${A}.${P}`]: T[P] extends string | number | Date | boolean ? T[P] : never;
} & T;

interface QueryTable<T> {
  where: <Conditions extends WhereCondition<T>>(condition: Conditions) => QueryTable<T>;
  select: <S extends Select<T> = never>(columns?: S) => QueryTable<SelectResult<T, S>>;
  all: () => Promise<T[]>;
  first: () => Promise<T>;
  firstOrDefault: () => Promise<T | null>;
  insert: (data: Partial<T>) => Promise<number>;
  update: (data: Partial<T>) => Promise<number>;
  delete: () => Promise<number>;
  limit: (limit: number) => QueryTable<T>;
  offset: (offset: number) => QueryTable<T>;
  sorting: (...fields: SortingList<T>) => QueryTable<T>;
  innerJoin: <T2>(table: QueryTable<T2>, leftColumn: keyof T, rightColumn: keyof T2) => QueryTable<T & T2>;
  leftJoin: <T2>(table: QueryTable<T2>, leftColumn: keyof T, rightColumn: keyof T2) => QueryTable<T & T2>;
  as: <A extends string>(alias: A) => QueryTable<AsResult<T, A>>;
}
