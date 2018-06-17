const path = require('path');

const cwd = process.cwd();

const pagesEntryPoints = {
  overview: path.join(cwd, 'src/overview/index.jsx')
};

module.exports = pagesEntryPoints;
