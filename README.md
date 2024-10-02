# @fourwaves/tiptap-extension-video

## Introduction

This project is a fork of [@tiptap/extension-youtube](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-youtube) that has been modified to support both Vimeo and YouTube videos. It works with the Tiptap editor, which is a headless wrapper around ProseMirror – a toolkit for building rich text WYSIWYG editors.

## Official Documentation

For general Tiptap usage and setup, please refer to the [Tiptap website](https://tiptap.dev/).

## Installation

```bash
npm install @fourwaves/tiptap-extension-video
```

## Usage

```typescript
import { Vimeo, Youtube } from '@fourwaves/tiptap-extension-video';

const editor = new Editor({
  extensions: [Vimeo, Youtube],
});
```
