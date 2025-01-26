// Path Module
import path from "path";

// This will give us only the filename from the path

// This will gives us the last portion of the path
// console.log(path.basename("c:\\mern-stack\\nodejs\\hello.js"));

// This is excludes the .js extension
// console.log(path.basename("c:\\mern-stack\\nodejs\\hello.js", ".js"));

// This is excludes the .js extension
// console.log(path.basename("c:\\mern-stack\\nodejs\\hello"));

// This will give us only the directory name from the path
// console.log(path.dirname("c:\\mern-stack\\nodejs\\hello"));

// This will allow us to get the extension of the file
// console.log(path.extname("c:\\mern-stack\\nodejs\\hello.html"));

// This will generate the path name based on the foldername and filename
// console.log(path.join("c:", "mern-stack", "nodejs"));

// This will remove the last folder and go one step out
// console.log(path.join("c:", "mern-stack", "nodejs", ".."));
// console.log(path.join("c:", "mern-stack", "nodejs", "../.."));

// console.log(path.normalize("c:\\courses\\merstack\\redux\\store\\features"));

console.log(path.parse("c:\\courses\\merstack\\redux\\store\\features.js"));
console.log(
  path.parse("c:\\courses\\merstack\\redux\\store\\features.js").root
);
console.log(path.parse("c:\\courses\\merstack\\redux\\store\\features.js").dir);
console.log(
  path.parse("c:\\courses\\merstack\\redux\\store\\features.js").base
);
