import { describe, expectTypeOf, test } from 'vitest';

describe('01-literal', () => {
  test('should be match literal', () => {
    type Welcome = 'Welcome to everybody!';
    const Welcome = 'Welcome to everybody!' as const satisfies Welcome;
    expectTypeOf(Welcome).toMatchTypeOf<Welcome>();
  })

  test('should be match literal', () => {
    const state = 'starting' as const
    type State = 'starting' | 'running' | 'arrived' | 'retired';
    expectTypeOf(state).toMatchTypeOf<string>();
    expectTypeOf(state).toMatchTypeOf<State>();
  });

  test('should be have different type', () => {
    type Status = true | false | '0' | '1';
    const status = '0' as const satisfies Status;
    expectTypeOf(status).toMatchTypeOf<Status>();
  })
})
