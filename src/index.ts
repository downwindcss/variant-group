import parse from './parse';
import zipWith from 'lodash.zipwith';

const joinTemplateStringsArray = (tailwindClassNames: TemplateStringsArray, ...args: any[]) =>
  zipWith(tailwindClassNames, args, (className, arg) => (className ?? "") + (arg ?? "")).join(' ')

// Future version will accept brackets as an "option".
// So you can do tw`tailwind classes` or tw(['(', '')])`tailwind classes`
// function tw(option, ...args) {
//   console.log({ option, brackets: tw.prototype.brackets });
//   const fn = (text, ...rest) => console.log({ option, text, rest });

//   if (!!option.raw) return fn(option, args);
//   else return fn;

//   throw Error("You can't do this!");
// }

function variantGroup(tailwindClassNames: TemplateStringsArray, ...args: any[]) {
  const brackets = ['(', ')'] as const;
  const classes = joinTemplateStringsArray(tailwindClassNames, args);

  const parsed = parse({ classes, brackets });
  return parsed.join(' ');
}

export default variantGroup;