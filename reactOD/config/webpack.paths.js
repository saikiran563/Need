const path = require('path');

const cwd = process.cwd();

const pagesEntryPoints = {
  myprofile: path.join(cwd, 'src/myprofile/index.jsx')
};

module.exports = pagesEntryPoints;
