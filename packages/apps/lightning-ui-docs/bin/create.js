#!/bin/node
/* global process */
/* eslint-disable no-console */

const fs = require('fs-extra');

const {
  componentTemplate,
  docsTemplate,
  storyTemplate,
  testTemplate,
  styleTemplate,
  typescriptDefinitionsTemplate,
} = require('./templates');

const compDir = './';
const validDirs = [ 'elements', 'patterns', 'layout'];

const [componentDir, componentName] = process.argv.slice(2);

if (!componentDir || !componentName) {
  throw new Error(`Missing component name or type.
Try again with something like: \`npm run create templates MyTemplate\`
  `)
}

if (!validDirs.includes(componentDir)) {
  throw new Error(`
Invalid component directory "${componentDir}".
Use one of the following: ${validDirs.join(', ')}
  `)
}

const workingDir = `./${compDir}/${componentDir}/${componentName}`;

if (fs.existsSync(workingDir)) {
  const message = `${componentName} already exists at ${workingDir}`;
  throw new Error(message);
}

const componentContent = componentTemplate(componentName, componentDir);
const storyContent = storyTemplate(componentName, componentDir);
const mdxContent = docsTemplate(componentName, componentDir);
const testContent = testTemplate(componentName, componentDir);
const styleContent = styleTemplate(componentName, componentDir);
const typescriptDefinitionsContent = typescriptDefinitionsTemplate(componentName, componentDir);

fs.mkdirp(workingDir).then(() => {
  fs.writeFile(`${workingDir}/index.js`, componentContent);
  fs.writeFile(`${workingDir}/${componentName}.stories.js`, storyContent);
  fs.writeFile(`${workingDir}/${componentName}.mdx`, mdxContent);
  fs.writeFile(`${workingDir}/${componentName}.test.js`, testContent);
  fs.writeFile(`${workingDir}/${componentName}.styles.js`, styleContent);
  fs.writeFile(`${workingDir}/${componentName}.d.ts`, typescriptDefinitionsContent);
}).catch(err => {
  console.error('component creation failed\n');
  throw new Error(err);
});