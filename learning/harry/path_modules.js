const { log } = require('node:console');
const path = require('node:path');

const a = path.basename('C:\\temp\\myfile.html');
// Returns: 'C:\\temp\\myfile.html'
console.log(a);

const b = path.dirname('C:\\temp\\myfile.html');
// Returns: C:\temp
console.log(b);

console.log(__filename);