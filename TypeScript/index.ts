// Annotating the variable to specify the datatype
const myName: string = "ali";

const age: number = 12;

let married: boolean = false;

// console.log(myName, age, married);
// ==============================

// type inference -> compiler automatically infer its type based on its type
let score = 12;

// score = false // Type Error

// console.log(score);

// ==============================

// if you wanna use variable like you do in js. Then this type is for you

let num: any = 12;
num = "ali";
num = true;
// console.log(num);

// ==============================

// function parameter annotation

// function add(num1: number, num2: number) {
//   return num1 + num2;
// }

const add = (num1: number, num2: number) => {
  return num1 + num2;
};

// console.log(add(2, 3));

// parameter with default value
const test = (greet: string = "guest") => {
  console.log(`hello, ${greet}`);
};

// test();
// test("Ali");

// Function return value
// function multiply(num1: number, num2: number): number {
//   return num1 * num2;
// }
const multiply = (num1: number, num2: number): number => {
  return num1 * num2;
};

const res = multiply(2, 3);
// console.log(res);

// ==============================

// void in TS

// ==============================

const printMessage = (message: string): void => {
  console.log(`Message: ${message}`);
};

// printMessage("What are you doing ?");

// ==============================

// Never keyword -> function (throws error, with infinite loop) or variable never have a value
function throwError(msg: string): never {
  throw new Error(msg);
}

function infiniteLoop(num: number): never {
  while (true) {}
}

let x: never;

// x = infiniteLoop(2);

// ==============================

// Arrays
// 1. [] Notation
// 2. Generic Notation

const nums: number[] = [1, 2, 3, 4];
const names: string[] = ["ali", "hassan", "true"];
// const names: Array<string> = ["ali", "hassan"]; // old style

// console.log(nums);
// console.log(names);

const items: string[] = [];
items.push("laptop");
items.push("iphone");

// console.log(items);

// ==============================

// Multi-Dimensional Arrays

const mul: number[][] = [[1, 2, 3, 4], [4, 2, 1, 5], nums];
const tri: number[][][] = [
  [
    [1, 2, 3, 4],
    [4, 2, 1, 5],
  ],
  [nums],
];

// for (let i = 0; i < mul.length; i++) {
//   for (let j = 0; j < mul[i].length; j++) {
//     console.log(`${mul[i][j]} /n`);
//   }
// }

console.log(mul);
console.log(tri);

// ==============================
