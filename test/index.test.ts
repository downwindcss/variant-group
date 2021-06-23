import group from '../src';

test('happy path', () => {
  group`text-white sm:(text-black bg-blue) lg:(text-red bg-white)`;
})