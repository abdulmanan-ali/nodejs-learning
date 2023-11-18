const { log } = require("node:console");
const fs = require("node:fs");

fs.readFile("file.txt", "utf-8", (err, data) => {
  console.log(err, data);
});
console.log("finished"); // 'finished is print first then it print the read file content'

const a = fs.readFileSync("file.txt");
console.log(a.toString());

console.log("finished"); // the 'readFileSync' run print first then print the 'finished' line

// write file

fs.writeFile("writefile.txt", "this is the written file", () => {
    console.log('written to the file');
});