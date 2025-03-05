// console.log(process.argv.slice(2)[0]);

// process.argv.forEach((element, index) => {
//   console.log(`${index}: ${element}`);
// });
const minimist = require("minimist");

const arg = minimist(process.argv.slice(2));
console.log(arg.name);
