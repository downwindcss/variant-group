import parse from './parse';
import zipWith from 'lodash.zipwith';

const joinTemplateStringsArray = (tailwindClassNames: TemplateStringsArray, ...args: any[]) =>
  zipWith(tailwindClassNames, args, (className, arg) => (className ?? "") + (arg ?? "")).join(' ')


function variantGroup(tailwindClassNames: TemplateStringsArray, ...args: any[]) {
  const brackets = ['(', ')'] as const;
  const classes = joinTemplateStringsArray(tailwindClassNames, args);

  const parsed = parse({ classes, brackets });
  return parsed.join(' ');
}

export default variantGroup;