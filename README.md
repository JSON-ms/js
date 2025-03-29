# @jsonms/js

[![npm version](https://badge.fury.io/js/@jsonms%2Fjs.svg)](https://www.npmjs.com/package/@jsonms/js)

`@jsonms/js` is an NPM package that allows you to synchronize your project data with a [JSON.ms](https://json.ms) instance. JSON.ms is an online admin panel generator that helps manage structured JSON data with ease.

## Installation

You can install `@jsonms/js` via npm:

```sh
npm install @jsonms/js
```

or using yarn:

```sh
yarn add @jsonms/js
```

## Usage

To integrate @jsonms/js into your project, simply import and bind it to the editor (the editor is the online service).

```ts
import { useJsonMs } from '@jsonms/js';

useJsonMs().bindToEditor();
```

Why bindToEditor()? Because your project is loaded from an iFrame within JSON.ms and this library instantiate a communication protocol with its parent caller.

#### bindToEditor Options

The bindToEditor function upports optional parameters for customization:

```ts
const bindToEditor = (options: {
  targetOrigin?: string; // Target origin of the iframe (default: *)
  onDataChange?: (data: any) => void; // Callback when data changes
  onLocaleChange?: (locale: string) => void; // Callback when locale changes
  onSectionChange?: (section: string) => void; // Callback when section changes
});
```
Now your project is ready to communicate with JSON.ms! You can use the callback functions to update your data as it is modified live by the user from the data editor.

