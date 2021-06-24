import parse from './parse';
import zipWith from 'lodash.zipwith';

export interface GroupOption {
  brackets: Readonly<[string, string]>;
}

const joinTemplateStringsArray = (tailwindClassNames: TemplateStringsArray, ...args: any[]) =>
  zipWith(tailwindClassNames, args, (className, arg) => (className ?? "") + (arg ?? "")).join(' ')

export type GroupInput = GroupOption | TemplateStringsArray;

function isOption(optionOrClasses: GroupInput): optionOrClasses is GroupOption {
  // return (optionOrClasses as GroupOption) !== undefined;
  return 'brackets' in optionOrClasses;
}
function isTemplateStringsArray(optionOrClasses: GroupInput): optionOrClasses is TemplateStringsArray {
  return (optionOrClasses as TemplateStringsArray) !== undefined;
}

const defaultBrackets: Readonly<[string, string]> = ['(', ')'];

function group(optionOrClasses: GroupInput, args?: any)
  : string | ((classes: TemplateStringsArray, args?: any) => string) {
  const fn = (tailwindClasses: TemplateStringsArray, ...args: any): string => {
    const classes = joinTemplateStringsArray(tailwindClasses, args);
    const parsed = parse({ classes, brackets });
    return parsed.join(' ');
  }

  let brackets = defaultBrackets;
  if (isOption(optionOrClasses)) {
    brackets ??= optionOrClasses.brackets;
    return fn;
  } else if (isTemplateStringsArray(optionOrClasses)) {
    return fn(optionOrClasses, args);
  }

  throw Error('Provide an option or pass classes with template string syntax!');
}

export default group;