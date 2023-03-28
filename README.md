# Tiptap for Directus

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

This is a [Directus](https://directus.io/) extension that provides the [Tiptap](https://tiptap.dev/) editor as a rich text field type.

For now, it only includes the [StarterKit](https://tiptap.dev/api/extensions/starter-kit) tiptap bundle. 

- npm package : `@bicou/directus-extension-tiptap`
- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Requirements

This extension requires Directus 9 or higher to be installed.

## Installation

Add `@bicou/directus-extension-tiptap` dependency to your directus project

```bash
# Using pnpm
pnpm add @bicou/directus-extension-tiptap
# Using yarn
yarn add @bicou/directus-extension-tiptap
# Using npm
npm install @bicou/directus-extension-tiptap
```

## Usage

When creating a field in Directus choose TipTap

![field creation](docs/field.png)

The value of the field is the JSON representation of [ProseMirror](https://prosemirror.net/) nodes.

## License

This extension is released under the MIT license. See the LICENSE file for more details.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@bicou/directus-extension-tiptap/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@bicou/directus-extension-tiptap

[npm-downloads-src]: https://img.shields.io/npm/dm/@bicou/directus-extension-tiptap.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@bicou/directus-extension-tiptap

[license-src]: https://img.shields.io/npm/l/@bicou/directus-extension-tiptap.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@bicou/directus-extension-tiptap
