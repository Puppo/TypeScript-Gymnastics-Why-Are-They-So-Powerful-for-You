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
    expectTypeOf('email').toMatchTypeOf<Props>();
  })

  test('mapped type', () => {
    type NewPerson = {
      [K in keyof Person]: Person[K];
    }
    expectTypeOf<Person>().toMatchTypeOf<NewPerson>();
  })

  test.todo('generics type')
  test.todo('partial type')
  test.todo('required type')
  test.todo('readonly type')
  test.todo('pick type')
  test.todo('omit type')
  test.todo('record type')
  test.todo('extract type')
  test.todo('exclude type')
})
