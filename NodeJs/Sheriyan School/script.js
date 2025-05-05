// Fundamentals of JS
// Arrays and Objects
// Function return
// Async JS Coding

// ==============================
// Arrays
// ==============================

// let arr = [
//   1,
//   2,
//   3,
//   4,
//   "Ali",
//   { name: "Ali", age: 22 },
//   true,
//   function () {},
//   [],
// ];

// foreach, map, filter, find, indexOf

// arr.forEach((element) => {
//   element += " " + "Hello";
//   console.log(element);
// });

// let newArray = arr.map((val) => {
//   return val + 10;
// });

// console.log(newArray);

// let ans = arr.filter((val) => {
//   if ((val & 1) != 1) return true;
// });

// console.log(ans);

// let arr = [1, 2, 3, 2, 4];
// let ans = arr.find((val) => {
//   if (val % 2 == 0) {
//     console.log("index of " + val + " is " + arr.indexOf(val));
//     return val;
//   }
// });

// console.log(ans);

// ==============================
// Objects
// ==============================
// let obj = {
//   name: "ali",
//   age: 22,
//   address: "Sialkot",
// };

// // this would freez the value (means we do not change the values)
// Object.freeze(obj);
// obj.age = 20;

// // console.log(obj["age"]);
// console.log(obj.age);

// ==============================
// functions
// ==============================
// function call(a, s, d) {}
// // Function length means number of parameters
// console.log(call.length);
// function call() {
//   return function () {
//     console.log("Inner function");
//   };
// }
// console.log(call());

// ==============================
// Async
// ==============================

async function test() {
  let blob = await fetch(`https://randomuser.me/api/`);
  let result = await blob.json();
  console.log(result);
}

test();
