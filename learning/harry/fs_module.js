// const { log } = require("node:console");
const fs = require("node:fs");

// fs.readFile("file.txt", "utf-8", (err, data) => { // this is non blocking request (Asynchronous)
//   console.log(err, data);
// });

// console.log("finished"); // 'finished is print first then it print the read file content' because the non blocking statment

// const a = fs.readFileSync("file.txt"); // this is blocking request (Synchrnous)
// console.log(a.toString());

// console.log("finished"); // the 'readFileSync' run print first then print the 'finished' line

// // write file-----------------------------------------------------

// fs.writeFile("writefile.txt", "this is change written file", () => {
//     console.log('written to the file'); // writing in the file
// });
//append file -------------------------------------------------------------------------

fs.appendFileSync("writefile.txt", "\n new data append") // add new data in the text file

//copy file data in new file -------------------------------------------------

fs.copyFileSync("writefile.txt", "copyfile.txt")

//delete file -------------------------------------------------

fs.unlinkSync("copyfile.txt")