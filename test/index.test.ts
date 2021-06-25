import group, { TemplateFunction, Brackets } from '../src';

const getClasses = (brackets = ['(', ')'] as Brackets) =>
  ` bg-red-800 p-2 text-white text-xs mt-4
    dark:${brackets[0]}text-gray-800 bg-gray-300${brackets[1]}
    sm:${brackets[0]}
      text-sm p-4 text-gray-100
      dark:${brackets[0]}bg-[#fff] text-white text-[30px]${brackets[1]}
    ${brackets[1]}
    md:${brackets[0]}
      text-base p-8
      bg-red-500 text-gray-100
      dark:${brackets[0]}bg-gray-600 text-red-100${brackets[1]}
    ${brackets[1]}
    lg:${brackets[0]}
      text-lg p-12
      bg-red-300 text-gray-700
      dark:${brackets[0]}bg-[#abcdef] text-red-100${brackets[1]}
    ${brackets[1]}
    xl:${brackets[0]}
      text-2xl p-16
      bg-white text-gray-800
      dark:${brackets[0]}bg-gray-800 text-red-100${brackets[1]}
    ${brackets[1]}`;

describe('Edge cases', () => {
  const EMPTY_SPACE = '';

  it('returns empty string for an empty input', () => {
    expect(group``).toBe(EMPTY_SPACE);
  });

  it('returns empty string for space(s) input', () => {
    const maxSpaceCount = 100;
    const buildSpaces = (count: number) =>
      Array(count)
        .fill(' ')
        .join(EMPTY_SPACE);
    for (let spaceCount = 1; spaceCount <= maxSpaceCount; spaceCount++) {
      const spaces = buildSpaces(spaceCount);
      expect(group`${spaces}`).toBe(EMPTY_SPACE);
    }
  });

  it('return empty space for whitespaces', () => {
    expect(group`


`).toBe(EMPTY_SPACE);
  });
});

describe('WITH configurations', () => {
  it('provides different brackets', () => {
    const option = { brackets: ['{', '}'] as const };
    const tw = group(option);
    if (typeof tw === 'string') fail('This should never be a string');
    expect(tw`text-white`).toBe('text-white');
  });

  test('Dynamic Brackets', () => {
    const bracketsList = [
      ['{', '}'],
      ['(', ')'],
    ] as Brackets[];
    const expected =
      'bg-red-800 p-2 text-white text-xs mt-4 dark:text-gray-800 dark:bg-gray-300 sm:text-sm sm:p-4 sm:text-gray-100 sm:dark:bg-[#fff] sm:dark:text-white sm:dark:text-[30px] md:text-base md:p-8 md:bg-red-500 md:text-gray-100 md:dark:bg-gray-600 md:dark:text-red-100 lg:text-lg lg:p-12 lg:bg-red-300 lg:text-gray-700 lg:dark:bg-[#abcdef] lg:dark:text-red-100 xl:text-2xl xl:p-16 xl:bg-white xl:text-gray-800 xl:dark:bg-gray-800 xl:dark:text-red-100';

    for (let i = 0; i < bracketsList.length; i++) {
      const brackets = bracketsList[i];
      let classNames = getClasses(brackets);
      const actual = (group({ brackets }) as TemplateFunction)`${classNames}`;

      expect(actual).toBe(expected);
    }
  });
});

describe('WithOUT configurations', () => {
  test('Dynamic Brackets', () => {
    // group`text-white sm:(text-black bg-blue) lg:(text-red bg-white)`;
    let brackets = ['(', ')'] as Brackets;
    let classNames = getClasses(brackets);

    const expected =
      'bg-red-800 p-2 text-white text-xs mt-4 dark:text-gray-800 dark:bg-gray-300 sm:text-sm sm:p-4 sm:text-gray-100 sm:dark:bg-[#fff] sm:dark:text-white sm:dark:text-[30px] md:text-base md:p-8 md:bg-red-500 md:text-gray-100 md:dark:bg-gray-600 md:dark:text-red-100 lg:text-lg lg:p-12 lg:bg-red-300 lg:text-gray-700 lg:dark:bg-[#abcdef] lg:dark:text-red-100 xl:text-2xl xl:p-16 xl:bg-white xl:text-gray-800 xl:dark:bg-gray-800 xl:dark:text-red-100';
    const actual = group`${classNames}`;

    expect(actual).toBe(expected);
  });
});
