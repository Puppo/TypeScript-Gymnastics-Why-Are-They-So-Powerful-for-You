import { describe, expectTypeOf, test } from 'vitest';

describe('02-template', () => {
  test('should be match template literal', () => {
    type State = 'starting' | 'running' | 'arrived' | 'retired';
    type Runner = 'Kevin' | 'John' | 'Doe';
    type RunnerStatus = `${Runner} is ${State}`;
    const RunnerStatus: RunnerStatus = 'Kevin is arrived';
    expectTypeOf(RunnerStatus).toMatchTypeOf<RunnerStatus>();
  })

  test('should be match rgb template literal', () => {
    type RgbColor = `rgb(${number},${number},${number})`;
    const color: RgbColor = 'rgb(230, 0,15)';
    expectTypeOf(color).toMatchTypeOf<RgbColor>();
  })
})
