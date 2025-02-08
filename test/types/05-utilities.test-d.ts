import { describe, expectTypeOf, test } from 'vitest';

describe('01-object', () => {
  interface Person {
    name: string;
    surname: string;
    age: number;
    gender: 'M' | 'F' | 'X';
    addresses: {
      street: string;
      city: string;
      country: string;
      postalCode: string;
    }[]
    email: string;
    phone?: string;
    policyAccepted?: { date: Date, version: string }; 
  }

  test('keyof', () => {
    type Props = keyof Person;
    expectTypeOf<Props>()
    .toEqualTypeOf<'name' | 'surname' | 'age' | 'gender' | 'addresses'| 'email' | 'phone' | 'policyAccepted'>();
  })

  test('mapped type', () => {
    type NewPerson = {
      [K in keyof Person]: Person[K];
    }
    expectTypeOf<Person>().toEqualTypeOf<NewPerson>();
  })

  test('partial type', () => {
    type PartialPerson = {
      [K in keyof Person]?: Person[K];
    }
    expectTypeOf<PartialPerson>().toEqualTypeOf<{
      name?: string;
      surname?: string;
      age?: number;
      gender?: 'M' | 'F' | 'X';
      addresses?: {
        street: string;
        city: string;
        country: string;
        postalCode: string;
      }[]
      email?: string;
      phone?: string;
      policyAccepted?: { date: Date, version: string }; 
    }>();

    expectTypeOf<PartialPerson>().toEqualTypeOf<Partial<Person>>();
  })

  test('required type', () => {
    type RequiredPerson = {
      [K in keyof Person]-?: Person[K];
    }
    expectTypeOf<RequiredPerson>().toEqualTypeOf<{
      name: string;
      surname: string;
      age: number;
      gender: 'M' | 'F' | 'X';
      addresses: {
        street: string;
        city: string;
        country: string;
        postalCode: string;
      }[]
      email: string;
      phone: string;
      policyAccepted: { date: Date, version: string }; 
    }>();

    expectTypeOf<RequiredPerson>().toEqualTypeOf<Required<Person>>();
  })

  test('readonly type', () => {
    type ReadonlyPerson = {
      readonly [K in keyof Person]: Person[K];
    }
    expectTypeOf<ReadonlyPerson>().toEqualTypeOf<{
      readonly name: string;
      readonly surname: string;
      readonly age: number;
      readonly gender: 'M' | 'F' | 'X';
      readonly addresses: {
        street: string;
        city: string;
        country: string;
        postalCode: string;
      }[]
      readonly email: string;
      readonly phone?: string;
      readonly policyAccepted?: { date: Date, version: string };
    }>();

    expectTypeOf<ReadonlyPerson>().toEqualTypeOf<Readonly<Person>>();
  })

  test('extract type', () => {
    type ExtractType<T, U> = T extends U ? T : never;

    type PersonName = ExtractType<'name' | 'surname' | 'age', 'name' | 'surname'>;
    expectTypeOf<PersonName>().toEqualTypeOf<'name' | 'surname'>();  

    type Shapes = { type: 'circle', radius: number } | { type: 'square', side: number } | { type: 'triangle', base: number, height: number };
    type Circle = ExtractType<Shapes, { type: 'circle' }>;
    expectTypeOf<Circle>().toEqualTypeOf<{ type: 'circle', radius: number }>();
    type Square = ExtractType<Shapes, { type: 'square' }>;
    expectTypeOf<Square>().toEqualTypeOf<{ type: 'square', side: number }>();
    type Triangle = ExtractType<Shapes, { type: 'triangle' }>;
    expectTypeOf<Triangle>().toEqualTypeOf<{ type: 'triangle', base: number, height: number }>();

    type CircleOrSquare = ExtractType<Shapes, { type: 'circle' } | { type: 'square' }>;
    expectTypeOf<CircleOrSquare>().toEqualTypeOf<{ type: 'circle', radius: number } | { type: 'square', side: number }>();

    
    expectTypeOf<Extract<'name' | 'surname' | 'age', 'name' | 'surname'>>().toEqualTypeOf<'name' | 'surname'>();  

    expectTypeOf<Extract<Shapes, { type: 'circle' }>>().toEqualTypeOf<{ type: 'circle', radius: number }>();
    expectTypeOf<Extract<Shapes, { type: 'square' }>>().toEqualTypeOf<{ type: 'square', side: number }>();
    expectTypeOf<Extract<Shapes, { type: 'triangle' }>>().toEqualTypeOf<{ type: 'triangle', base: number, height: number }>();

    expectTypeOf<Extract<Shapes, { type: 'circle' } | { type: 'square' }>>().toEqualTypeOf<{ type: 'circle', radius: number } | { type: 'square', side: number }>();
  })
  test('exclude type', () => {
    type ExcludeType<T, U> = T extends U ? never : T;

    expectTypeOf<ExcludeType<'name' | 'surname' | 'age', 'name' | 'surname'>>().toEqualTypeOf<'age'>();  

    type Shapes = { type: 'circle', radius: number } | { type: 'square', side: number } | { type: 'triangle', base: number, height: number };
    expectTypeOf<ExcludeType<Shapes, { type: 'circle' }>>().toEqualTypeOf<{ type: 'square', side: number } | { type: 'triangle', base: number, height: number }>();
    expectTypeOf<ExcludeType<Shapes, { type: 'square' }>>().toEqualTypeOf<{ type: 'circle', radius: number } | { type: 'triangle', base: number, height: number }>();
    expectTypeOf<ExcludeType<Shapes, { type: 'triangle' }>>().toEqualTypeOf<{ type: 'circle', radius: number } | { type: 'square', side: number }>();

    expectTypeOf<ExcludeType<Shapes, { type: 'circle' } | { type: 'square' }>>().toEqualTypeOf<{ type: 'triangle', base: number, height: number }>();


    expectTypeOf<Exclude<Shapes, { type: 'circle' }>>().toEqualTypeOf<{ type: 'square', side: number } | { type: 'triangle', base: number, height: number }>();
    expectTypeOf<Exclude<Shapes, { type: 'square' }>>().toEqualTypeOf<{ type: 'circle', radius: number } | { type: 'triangle', base: number, height: number }>();
    expectTypeOf<Exclude<Shapes, { type: 'triangle' }>>().toEqualTypeOf<{ type: 'circle', radius: number } | { type: 'square', side: number }>();

    expectTypeOf<Exclude<Shapes, { type: 'circle' } | { type: 'square' }>>().toEqualTypeOf<{ type: 'triangle', base: number, height: number }>();
  })


  test('pick type', () => {
    type PickType<T, U extends keyof T> = {
      [K in U]: T[K]
    }
    
    type PersonNames = PickType<Person, 'name' | 'surname'>
    expectTypeOf<PersonNames>().toEqualTypeOf<{
      name: string,
      surname: string;
    }>()

    expectTypeOf<Pick<Person, 'name' | 'surname'>>().toEqualTypeOf<{
      name: string,
      surname: string;
    }>()
  })

  test('omit type', () => {
    type OmitType<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>
    
    type PersonNames = OmitType<Person, 'age' | 'addresses' | 'email' | 'gender' | 'phone' | 'policyAccepted'>
    expectTypeOf<PersonNames>().toEqualTypeOf<{
      name: string,
      surname: string;
    }>()

    expectTypeOf<Omit<Person, 'age' | 'addresses' | 'email' | 'gender' | 'phone' | 'policyAccepted'>>().toEqualTypeOf<{
      name: string,
      surname: string;
    }>()
  })
})
