# How to build the site:

## Installation
Make sure to install node, fs, ejs, and less by running the commands below in the terminal

```bash
npm install --save
npm install fs --save
npm install ejs --save
npm install less --save
```

# Usage
To build the site, follow the steps below and then open index.html in the build folder

Run the command below in the terminal to include any changes made to less
```bash
  ./node_modules/less/bin/lessc ./LESS/styles.less ./build/css/styles.css
```
Write blog posts in the provided spaces in blog_generator.js file and run the command below in the terminal to generate the site
```bash
  node blog_generator.js
```
