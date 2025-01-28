import * as fs from "fs/promises";

// Creating Directory -> Promise
// try {
//   await fs.mkdir("d:\\nodejs\\course", {
//     recursive: true,
//   });
//   console.log("Folder created!");
// } catch (error) {
//   console.log(error);
// }

// =========================

// Read content
// try {
//   const files = await fs.readdir("d:\\nodejs");

//   for (const file of files) {
//     console.log(file);
//   }
// } catch (error) {
//   console.log(error);
// }

// =========================

// Remove Folder / Directory
// We cannot delete folders unless they are empty
// try {
//   await fs.rmdir("d:\\nodejs\\course");
//   console.log("removed...");
// } catch (error) {
//   console.log(error);
// }

// =========================

// Create and write file
// by default it will replace / overwrite the content and file if already exists
// try {
//   await fs.writeFile("readme.md", "Hello Ali");
// } catch (error) {
//   console.log(error);
// }

// =========================

// Read a file
// try {
//   const data = await fs.readFile("readme.md", "utf-8");
//   console.log(data);
// } catch (error) {
//   console.log(error);
// }

// =========================

// Append data in file
// try {
//   await fs.appendFile("readme.md", "\nNodeJs is best");
//   console.log("Data append !");
// } catch (error) {
//   console.log(error);
// }

// =========================

// Copy file
// try {
//   await fs.copyFile("readme.md", "info.txt");
//   console.log("copied!");
// } catch (error) {
//   console.log(error);
// }

// =========================

// Get file info
try {
  const info = await fs.stat("info.txt");
  // console.log(info);
  // console.log(info.isDirectory());
  console.log(info.isFile());
} catch (error) {
  console.log(error);
}

// =========================
// =========================
