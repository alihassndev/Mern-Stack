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
// console.log(num);

num = "ali";
// console.log(num);

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
console.log(res);

// ==============================

// void in TS

// ==============================
