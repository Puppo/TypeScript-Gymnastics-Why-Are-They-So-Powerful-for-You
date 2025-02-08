import { describe, expectTypeOf, test } from 'vitest';

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
  policyAccepted: { date: Date, version: string }; 
}

type GetAllKeysAndNestedKeys<T, Prefix extends string | number = ''> = {
  [K in keyof T]: 
    K extends string | number ?
      (
        Exclude<T[K], undefined | null> extends (infer R)[] ?
          `${Prefix}${K}` | `${Prefix}${K}.${number}` | GetAllKeysAndNestedKeys<R, `${Prefix}${K}.${number}.`>
          : 
        Exclude<T[K], undefined | null> extends Record<string | number, unknown> ?
            `${Prefix}${K}` | GetAllKeysAndNestedKeys<Exclude<T[K], undefined | null>, `${Prefix}${K}.`>
            : `${Prefix}${K}`
      )
    : never;
}[keyof T];

type GetValueByPath<T, K> = 
  K extends `${infer Key}.${infer Rest}`
    ? Key extends `${number}`
      ? T extends (infer R)[]
        ? GetValueByPath<R, Rest>
        : never
      : Key extends keyof T
        ? GetValueByPath<T[Key], Rest>
        : never
    : K extends `${number}`
      ? T extends (infer R)[]
        ? R
        : never
      : K extends keyof T
      ? T[K]
      : never;

declare function getByKey<const T, const K extends GetAllKeysAndNestedKeys<T>>(obj: T, key: K): GetValueByPath<T, K>;

describe('06-get-by-key', () => {

  test('should create getByKey utility type', () => {
    const person: Person = {
      name: 'John',
      surname: 'Doe',
      age: 30,
      gender: 'M',
      addresses: [
        { street: 'Main St', city: 'New York', country: 'USA', postalCode: '10001' }
      ],
      email: 'email@email.it',
      phone: '1234567890',
      policyAccepted: { date: new Date(), version: '1.0' }
    }

    const address = getByKey(person, 'addresses.0');
    const street = getByKey(person, 'addresses.0.street');
    const postalCode = getByKey(person, 'addresses.0.postalCode');
    const date = getByKey(person, 'policyAccepted.date');
    const policyAccepted = getByKey(person, 'policyAccepted');
    const age = getByKey(person, 'age');
    
    expectTypeOf(address).toEqualTypeOf<{
      street: string;
      city: string;
      country: string;
      postalCode: string;
    }>()
    expectTypeOf(street).toEqualTypeOf<string>()
    expectTypeOf(postalCode).toEqualTypeOf<string>()
    expectTypeOf(date).toEqualTypeOf<Date>()
    expectTypeOf(policyAccepted).toEqualTypeOf<{
      date: Date;
      version: string;
    }>()
    expectTypeOf(age).toEqualTypeOf<number>()
  })
})
