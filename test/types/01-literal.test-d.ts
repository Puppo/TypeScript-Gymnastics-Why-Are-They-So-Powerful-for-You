import { describe, expectTypeOf, test } from 'vitest';

describe('01-literal', () => {
  test('should be match literal', () => {
    type Welcome = 'Welcome to everybody!';
    const Welcome = 'Welcome to everybody!';
    expectTypeOf(Welcome).toMatchTypeOf<Welcome>();
  })

  test('should be match literal', () => {
    const state = 'starting'
    expectTypeOf(state).toMatchTypeOf<string>();
    expectTypeOf(state).toMatchTypeOf<'starting' | 'running' | 'arrived' | 'retired'>();
  });

  test('should be match concat literal', () => {
    type State = 'starting' | 'running' | 'arrived' | 'retired';
    type Runner = 'Kevin' | 'John' | 'Doe';
    const RunnerStatus = `Kevn is arrivd`;
    expectTypeOf(RunnerStatus).toMatchTypeOf<`${Runner} is ${State}`>();
  })

  test('should be have different type', () => {
    type Status = true | false | '0' | '1';
    const status = '0';
    expectTypeOf(status).toMatchTypeOf<Status>();
  })
})
