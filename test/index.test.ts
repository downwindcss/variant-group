import group from '../src';

test('happy path', () => {
  // group`text-white sm:(text-black bg-blue) lg:(text-red bg-white)`;


  let brackets = ['(', ')']
  // brackets = ['{', '}']
  let classNames = `bg-red-800 p-2 text-white text-xs mt-4
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
    ${brackets[1]}`

  const actual = group`${classNames}`
  console.log({ classNames, actual })
})