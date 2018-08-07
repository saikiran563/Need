const fs = require('fs-extra')

fs.copy('node_modules/vz-react-dev', 'src/vz-react-dev', err => {
if (err) return console.error(err)
console.log('success!')
});