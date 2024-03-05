import { test, expect, vi } from 'vitest';
import { log } from './log';

test('it spies on the multiply method', () => {
  const mock = vi.fn((x?: string) => {
    if (x) return x.repeat(3);
  });

  mock();
  mock();
  const result = mock('wow');

  expect(mock).toHaveBeenCalledTimes(3);
  expect(mock).toHaveBeenCalledWith('wow');
  expect(result).toMatchInlineSnapshot('"wowwowwow"');

  vi.spyOn(console, 'log');
  log('log', 1, 2, 3);

  expect(console.log).toHaveBeenCalled();
  expect(console.log).toHaveBeenCalledWith(1, 2, 3);
});
