const fs = require("fs");
const path = require("path");

// fs.writeFile, fs.copyFile, fs.appendFile, fs.rename, fs.unlink

// Write File

// fs.writeFile("./test/test.txt", "This is starting node", (err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("Done !");
//   }
// });

// Append File

// fs.appendFile("test.txt", "\nIts amazing to learn this", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Done !");
//   }
// });

// Rename File

// fs.rename("test.txt", "sample.txt", (err) => {
//   //   if (err) console.log(err);

//   if (err) throw err;
//   console.log("Rename successfully !");
// });

// Copy File

// Here fs.constant.COPYFILE_EXCL will prohibit the program to copy the file if it already exists

// fs.copyFile("sample.txt", "test.txt", fs.constants.COPYFILE_EXCL, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Copied Successfully !");
//   }
// });

// fs.copyFile("sample.txt", "test.txt", (err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("Copied Successfully !");
//   }
// });

// unlink

// fs.unlink("sample.txt", (err) => {
//   if (err) console.log(err.message);
//   else console.log("Removed successfully !");
// });

// Make folder

// fs.mkdir("newFolder", (err) => {
//   if (err) console.log(err.message);
//   else console.log("Folder created successfully !");
// });

// Remove Folder
// fs.rm("./test", { recursive: true }, (err) => {
//   if (err) console.log(err.message);
//   else console.log("Folder removed successfully !");
// });

// Read Folder
// fs.readdir("./test", (err) => {
//   if (err) console.log(err.message);
//   else console.log("Read !");
// });

// Read File
// const data = fs.readFile("./test/test.txt", (err) => {
//   if (err) console.log(err.message);
//   else console.log("Read !");
// });

// const folderPath = "./test"; // Replace with your folder path

// fs.readdir(folderPath, (err, files) => {
//   if (err) {
//     console.error("Error reading directory:", err);
//     return;
//   }

//   files.forEach((file) => {
//     const filePath = path.join(folderPath, file);

//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         console.error(`Error reading file ${file}:`, err);
//         return;
//       }

//       console.log(`\n--- Contents of ${file} ---\n`);
//       console.log(data);
//     });
//   });
// });
