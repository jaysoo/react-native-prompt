[![](https://img.shields.io/npm/dm/react-native-prompt.svg?style=flat-square)](https://www.npmjs.com/package/react-native-prompt)

# react-native-prompt

A cross-platform prompt component for React Native.

## Installation

```
$ npm install react-native-prompt --save
```

## Demo

| iOS | Android |
| --- | ------- |
| ![](./demo.ios.gif) | ![](./demo.android.gif) |

## Basic Usage

```js
import Prompt from 'react-native-prompt';

// Inside render()
<Prompt
    title="Say something"
    placeholder="Start typing"
    defaultValue="Hello"
    visible={ this.state.promptVisible }
    onCancel={ () => this.setState({
      promptVisible: false,
      message: "You cancelled"
    }) }
    onSubmit={ (value) => this.setState({
      promptVisible: false,
      message: `You said "${value}"`
    }) }/>
```

Please refer to the full working example [here](./PromptExample/PromptExample.js).

## API

Props:

- `visible` (boolean) -- When `true`, the prompt is displayed, closes otherwise
- `title` (string, required) -- The title text of the prompt
- `placeholder` (string) -- The placeholder text of the prompt
- `defaultValue` (string) -- The default value of the prompt
- `onCancel` (function, required) -- Function that is called when user cancels prompt
- `onSubmit` (function, required) -- Function that is called with user's value when they submit
- `submitText` (string) -- The string that is displayed on the submit button (defaults to "OK")
- `cancelText` (string) -- The string that is displayed on the cancel button (defaults to "Cancel")
- `onChangeText` (function) -- Function that is called with user input when it changes.
- `textInputProps` (Object) -- Additional props on the input element

## Testing

Install dev modules:

```
npm install
```

### Run tests

```
npm test
```

## Changelog

### 1.0.0

- Updates `value` when `defaultValue` changes. (Thanks https://github.com/vessp)
- Removes unnecessary `flex: 1` style. (Thanks https://github.com/stevehollaar)

### 0.18.6

- Adds `textInputProps` to allow additional props to be passed to the input element. Thanks @yueshuaijie!

### 0.18.5 

- Fixed compatibility with React Native 0.27.2 (thanks [@sibelius](https://github.com/sibelius) and [@tonyxiao](https://github.com/tonyxiao)!)
