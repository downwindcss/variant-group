import parse from './parse';
import zipWith from 'lodash.zipwith';

const joinTemplateStringsArray = (tailwindClassNames: TemplateStringsArray, ...args: any[]) =>
  zipWith(tailwindClassNames, args, (className, arg) => (className ?? "") + (arg ?? "")).join(' ')


function variantGroup(tailwindClassNames: TemplateStringsArray, ...args: any[]) {
  const brackets = ['(', ')'] as const;
  const classes = joinTemplateStringsArray(tailwindClassNames, args);

  let result = parse({ classes, brackets });
  console.log({ classes, result })
}

variantGroup`text-white sm:(text-black bg-blue) lg:(text-red bg-white)`;

export default variantGroup;