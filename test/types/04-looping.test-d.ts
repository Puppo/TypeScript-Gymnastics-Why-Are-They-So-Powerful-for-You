import { describe, expectTypeOf, test } from 'vitest';

describe('04-looping', () => {
  interface Column<T = unknown> {
    name: string;
    value: T[];
  }

  // type Table = [Column, ...Column[]];
  // const table: Table = [{ name: "firstName", value: ['a', 'b', 'c'] }];

  type UserTable = [
    { name: "firstName"; value: string[] },
    { name: "lastName"; value: string[] },
    { name: "role"; value: ('manager' | 'employee')[] },
  ];

  type GetColumn<List, Name> =
  List extends [infer First, ...infer Rest]
    ? First extends { name: Name, value: unknown[] }
      ? First
      : GetColumn<Rest, Name>
    : never;

  test('should return column', () => {
    expectTypeOf<GetColumn<UserTable, 'firstName'>>().toEqualTypeOf<{ name: "firstName"; value: string[] }>();
    expectTypeOf<GetColumn<UserTable, 'role'>>().toEqualTypeOf<{ name: "role"; value: ('manager' | 'employee')[] }>();
    expectTypeOf<GetColumn<UserTable, 'address'>>().toEqualTypeOf<never>();
  })

  test('should append element', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Append<Tuple extends any[], Element> = [...Tuple, Element];

    expectTypeOf<Append<[1, 2, 3], 4>>().toEqualTypeOf<[1, 2, 3, 4]>();
    expectTypeOf<Append<[], 4>>().toEqualTypeOf<[4]>();
    expectTypeOf<Append<['hello'], 'world'>>().toEqualTypeOf<['hello', 'world']>();

    expectTypeOf<Append<['hello'], 3>>().toEqualTypeOf<[ 'hello', 3]>();
  })

  test('should find element', () => {
    type Find<Tuple extends unknown[], Element> =
      Tuple extends [infer F, ...infer R] ? 
        F extends Element ?
          F :
          Find<R, Element> :
      never;

    expectTypeOf<Find<[1, 2, 3], 2>>().toEqualTypeOf<2>();
    expectTypeOf<Find<['hello', 'world'], 'world'>>().toEqualTypeOf<'world'>();
    expectTypeOf<Find<['hello', 'world'], 'worl'>>().toEqualTypeOf<never>();

    expectTypeOf<Find<[1, 2, 3, 4, 5], 2>>().toEqualTypeOf<2>();
  })

  test('should filter element', () => {
    type Filter<Tuple extends unknown[], Element, Result extends unknown[] = []> =
      Tuple extends [infer F, ...infer R] ? 
        F extends Element ?
          Filter<R, Element, [...Result, F]> :
          Filter<R, Element, Result> :
      Result;

    expectTypeOf<Filter<[1, 2, 3], 2>>().toEqualTypeOf<[2]>();
    expectTypeOf<Filter<['hello', 'world'], 'world'>>().toEqualTypeOf<['world']>();
    expectTypeOf<Filter<['hello', 'world'], 'word'>>().toEqualTypeOf<[]>();

    expectTypeOf<Filter<[1, 2, 3, 4, 5], 2 | 5>>().toEqualTypeOf<[2, 5]>();
  })

  test('should remove element', () => {
    type Remove<Tuple extends unknown[], Element> =
      Tuple extends [infer F, ...infer R] ? 
        F extends Element ?
          Remove<R, Element> :
          [F, ...Remove<R, Element>] :
      Tuple;

    expectTypeOf<Remove<[1, 2, 3], 2>>().toEqualTypeOf<[1, 3]>();
    expectTypeOf<Remove<['hello', 'world'], 'world'>>().toEqualTypeOf<['hello']>();
    expectTypeOf<Remove<['hello', 'world'], 'word'>>().toEqualTypeOf<['hello', 'world']>();

    expectTypeOf<Remove<[1, 2, 3, 4, 5], 2 | 5>>().toEqualTypeOf<[1, 3, 4]>();
  })
})
