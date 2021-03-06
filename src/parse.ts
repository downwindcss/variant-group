/**
 * Code copied from https://github.com/ben-rogerson/twin.macro/blob/16911c0dc7/src/getStyleData.js
 * https://github.com/ben-rogerson/twin.macro/blob/16911c0dc75999e7f33edf12039f042fdab50b94/src/variants.js#L126
 *
 * https://github.com/ben-rogerson/twin.macro/blob/16911c0dc75999e7f33edf12039f042fdab50b94/src/utils/misc.js#L4
 *
 * https://github.com/ben-rogerson/twin.macro/blob/16911c0dc7/src/contants.js
 */

/**
 * A random dunder GUID to prevent spaces in groups from messing up the parse
 */
const SPACE_ID = '__d94f8099-0b3c-471b-85d8-35da7da7a32f__';

export interface ParserProps {
  classes: string;
  brackets: Readonly<[string, string]>;
  context?: string;
  start?: number;
  end?: number;
}

type FindRightBracketProps = Pick<
  ParserProps,
  'classes' | 'brackets' | 'start' | 'end'
>;

function findRightBracket({
  classes,
  brackets,
  start = 0,
  end = classes.length,
}: FindRightBracketProps): number {
  let stack = 0;
  for (let index = start; index < end; index++) {
    if (classes[index] === brackets[0]) {
      stack += 1;
    } else if (classes[index] === brackets[1]) {
      if (stack === 0) return -1;
      if (stack === 1) return index;
      stack -= 1;
    }
  }

  return -1;
}

function parse({
  classes,
  brackets,
  context = '',
  start = 0,
  end,
}: ParserProps) {
  if (classes === '') return [];

  const results = [] as string[];
  classes = classes.slice(start, end).trim();

  const reg = RegExp(
    `([\\w-]+:)|([\\w-./[\\]]+!?)|\\${brackets[0]}|(\\S+)`,
    'g'
  );

  let match;
  const baseContext = context;

  while ((match = reg.exec(classes))) {
    const [, variant, className, weird] = match;

    if (variant) {
      context += variant;

      // Skip empty classes
      if (/\s/.test(classes[reg.lastIndex])) {
        context = baseContext;
        continue;
      }

      if (classes[reg.lastIndex] === brackets[0]) {
        const closeBracket = findRightBracket({
          classes,
          brackets,
          start: reg.lastIndex,
        });
        results.push(
          ...parse({
            classes,
            brackets,
            context,
            start: reg.lastIndex + 1,
            end: closeBracket,
          })
        );
        reg.lastIndex = closeBracket + 1;
        context = baseContext;
      }
    } else if (className && className.includes('[')) {
      const closeBracket = findRightBracket({
        classes,
        brackets: ['[', ']'],
        start: match.index,
        end: classes.length,
      });
      const cssClass = classes.slice(match.index, closeBracket + 1);
      // Convert spaces in classes to a temporary string so the css won't be
      // split into multiple classes
      const spaceReplacedClass = cssClass
        // Normalise the spacing - single spaces only
        // Replace spaces with the space id stand-in
        // Remove newlines within the brackets to allow multiline values
        .replace(/\s+/g, SPACE_ID);

      results.push(context + spaceReplacedClass);

      reg.lastIndex = closeBracket + 1;
      context = baseContext;
    } else if (className) {
      results.push(context + className);
      context = baseContext;
    } else if (weird) {
      results.push(context + weird);
    } else {
      const closeBracket = findRightBracket({
        classes,
        brackets,
        start: match.index,
      });
      results.push(
        ...parse({
          classes,
          brackets,
          context,
          start: match.index + 1,
          end: closeBracket,
        })
      );
      reg.lastIndex = closeBracket + 1;
    }
  }

  return results;
}

export default parse;
