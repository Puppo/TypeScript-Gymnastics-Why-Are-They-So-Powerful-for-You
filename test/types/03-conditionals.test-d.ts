import { describe, expectTypeOf, test } from 'vitest';

describe('03-conditionals', () => {

  test('should be match if condition type', () => {
    type IF<C extends true | false, T, E> = C extends true ? T : E;

    expectTypeOf<IF<true, 'yes', 'no'>>().toEqualTypeOf<'yes'>();
    expectTypeOf<IF<false, 'yes', 'no'>>().toEqualTypeOf<'no'>();
  })

  test('should return the return type', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type ReturnTypeCondition<T> = T extends (...args: any[]) => infer R ? R : never;

    expectTypeOf<ReturnTypeCondition<() => string>>().toEqualTypeOf<string>();
    expectTypeOf<ReturnTypeCondition<(a: number) => boolean>>().toEqualTypeOf<boolean>();
    expectTypeOf<ReturnTypeCondition<boolean>>().toEqualTypeOf<never>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn = (a: number) => a > 0 ? 'yes' : 'no';
    expectTypeOf<ReturnTypeCondition<typeof fn>>().toEqualTypeOf<'yes' | 'no'>();

    expectTypeOf<ReturnType<typeof fn>>().toEqualTypeOf<'yes' | 'no'>();
  })

  test('should return the parameters type', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type ParametersCondition<T> = T extends (...args: infer P) => any ? P : never;

    expectTypeOf<ParametersCondition<() => string>>().toEqualTypeOf<[]>();
    expectTypeOf<ParametersCondition<(a: number) => boolean>>().toEqualTypeOf<[number]>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn = (a: boolean) => a ? 'yes' : 'no';
    expectTypeOf<ParametersCondition<typeof fn>>().toEqualTypeOf<[boolean]>();

    expectTypeOf<Parameters<typeof fn>>().toEqualTypeOf<[boolean]>();
  })
})
