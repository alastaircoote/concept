React templates: quick example
==

We can use a combination of React, JSX templates and contexts to allow producers to create their own custom quizzes.

Areas of note
---
- `quiz.jsx` - the file the producer would edit. Uses React components defined in...

- `components/` - some brief examples of question and answer components that could make up a quiz.

Tasks
--

`npm run watch`

Runs Webpack in "hot" mode, where it will automatically reload CSS and/or the page as you change files. Also includes source maps in JS and SCSS.

`npm run dist`

Builds your files for production - minified with no source maps. Places them in the `dist` directory.
