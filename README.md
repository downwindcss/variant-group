# @downwindcss/variant-group

A javascript library to convert a class text containing variant groups.

This is a javascript version of [downwindcss/postcss-tailwindcss-at-rules](https://github.com/downwindcss/postcss-tailwindcss-at-rules).

## Installation

```sh
$ npm install @downwindcss/variant-group
# or 
$ yarn add @downwindcss/variant-group
# or
pnpm add @downwindcss/variant-group
```

## Configuration

Import it into your source file, and use it like (using JSX below)

```jsx
import group from '@downwindcss/variant-group';

<button className={group`
    bg-red-800 p-2 text-white text-xs mt-4
    dark:(text-gray-800 bg-gray-300)
    sm:(
      text-sm p-4 text-gray-100
      dark:(bg-gray-500 text-white)
    )
    md:(
      text-base p-8
      bg-red-500 text-gray-100
      dark:(bg-gray-600 text-red-100)
    )
    lg:(
      text-lg p-12
      bg-red-300 text-gray-700
      dark:(bg-gray-700 text-red-100)
    )
    xl:(
      text-2xl p-16
      bg-white text-gray-800
      dark:(bg-gray-800 text-red-100)
    )`}>
Toggle Button
</button>
```