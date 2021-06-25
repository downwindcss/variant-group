import parse from './parse';
import zipWith from 'lodash.zipwith';

export type Brackets = Readonly<[string, string]>;
export interface GroupOption {
  brackets: Brackets;
}
export type TemplateFunction = (
  classes: TemplateStringsArray,
  args?: any
) => string;
export type GroupInput = GroupOption | TemplateStringsArray;

const joinTemplateStringsArray = (
  tailwindClassNames: TemplateStringsArray,
  ...args: any[]
) =>
  zipWith(
    tailwindClassNames,
    args,
    (className, arg) => (className ?? '') + (arg ?? '')
  ).join(' ');

function isOption(optionOrClasses: GroupInput): optionOrClasses is GroupOption {
  // return (optionOrClasses as GroupOption) !== undefined;
  return 'brackets' in optionOrClasses;
}
function isTemplateStringsArray(
  optionOrClasses: GroupInput
): optionOrClasses is TemplateStringsArray {
  return (optionOrClasses as TemplateStringsArray) !== undefined;
}

const defaultBrackets: Brackets = ['(', ')'];

function group(
  optionOrClasses: GroupInput,
  args?: any
): string | TemplateFunction {
  let brackets: Brackets;
  const fn = (tailwindClasses: TemplateStringsArray, ...args: any): string => {
    const classes = joinTemplateStringsArray(tailwindClasses, args);
    const parsed = parse({ classes, brackets: brackets ?? defaultBrackets });
    return parsed.join(' ');
  };

  if (isOption(optionOrClasses)) {
    brackets = optionOrClasses.brackets ?? defaultBrackets;
    return fn;
  } else if (isTemplateStringsArray(optionOrClasses)) {
    return fn(optionOrClasses, args);
  }

  throw Error('Provide an option or pass classes with template string syntax!');
}

export { parse };
export default group;
