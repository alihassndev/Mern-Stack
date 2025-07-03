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

// console.log(mul);
// console.log(tri);

// ==============================

// Objects

// ===========  Using Interfaces  ===============

// interface Person {
//   name: string;
//   age: number;
//   location: string;
// }

// interface User extends Person {
//   status: string;
//   isAdmin?: boolean;
// }

// ===========  Using type  ===============

type Person = {
  name: string;
  age?: number;
  location: string;
};

// intersection types in TS
type User = Person & {
  status?: string; // optional property
};

// ===========  End Declaration  ===============

const person: Person = {
  name: "Ali",
  location: "Sialkot",
};

//  "??" -> this is nullish coalescing operator to give the default value to a null property
// console.log(
//   `Name: ${person.name}, age: ${person.age ?? 18} and location: ${
//     person.location
//   }`
// );

const user: User = {
  status: "new user",
  name: "Ali",
  age: 20,
  location: "Lahore",
};

// console.log(person);
// console.log(user);

// -------------------------

// interface for a function
interface MathOperation {
  (x: number, y: number): number;
}

const addNum: MathOperation = (a, b) => a + b;
const mulNum: MathOperation = (a, b) => a * b;

console.log(addNum(2, 3));
console.log(mulNum(2, 3));

// ================ factory function ==================
// function myUser(): { name: string; age: number; location: string } {
//   return {
//     name: "ali",
//     age: 21,
//     location: "Gujranwala",
//   };
// }

// const newUser = myUser();
// console.log(newUser);

// ========== Other and cleaner way to write factory function ==========
interface Employee {
  name: string;
  age: number;
  readonly location: string;
}

function myEmployee(): Employee {
  return {
    name: "Hassan",
    age: 23,
    location: "Sialkot",
  };
}

const newEmp: Employee = myEmployee();

// // gives an error because it is readonly property
// newEmp.location = "Lahore"
newEmp.name = "Ali hassan";

// console.log(newEmp);

// ==============================

type Status = "active" | "inactive";
type Age = number;

type Animal = {
  age: Age;
  status: Status;
};

const newAnimal: Animal = {
  age: 1,
  status: "active",
};

// console.log(newAnimal);

// ==============================

// Union types -> this only work for type like we have in intersection types
type myAge = number | string;

let newAge: myAge = 12;
newAge = "23";

// console.log(`Age: ${newAge}`);

const str: (number | string)[] = [12, 3, 3.2, "hello", "sialkot"];

// console.log(str);

// ==============================

// Literal types
// Always use let keyword when using this

// String literals
let color: "red" | "green" | "blue";
color = "red";
// color = "black"; // Error

// -----------------------------

// boolean literals
let valid: true;
valid = true;
// valid = false // Error

// -----------------------------

// Number literals
let number: 1 | 2 | 3;

number = 3;
// number=4 // Error

// console.log(number);

// ==============================

// Tuples

let myTuple: [string, number] = ["hello", 12];

// destructuring an array
let [first, second] = myTuple;

first = "world";

// console.log(`First -> ${first}`);
// console.log(`Second -> ${second}`);

// -----------------------------

// type UserTuple = [id: number, name: string, isAdmin?: boolean, tags?: string[]];
interface UserTuple {
  id: number;
  name: string;
  isAdmin?: boolean;
  tags?: string[];
}

// const user1: UserTuple = [1, "ali"];
const user1: UserTuple = { id: 1, name: "ali" };
const user2: UserTuple = {
  id: 1,
  name: "ali",
  isAdmin: true,
  tags: ["editor", "reviewer"],
};

// This will print like this -> "User 2 -> [object Object]"
// console.log(`User 2 -> ${user2}`);

// console.log(`User 1 -> ${JSON.stringify(user1)}`);
// console.log(`User 2 -> ${JSON.stringify(user2)}`);

// ==============================

// Enum
enum WeatherCondition {
  Sunny,
  Cloudy,
  Rainy = "Rainy",
  Snowy = "Snowy",
}

// const weather = WeatherCondition.Snowy;

// console.log(WeatherCondition);

// console.log(WeatherCondition.Sunny); // output -> 0 (gets index)
// console.log(WeatherCondition.Snowy); // output -> Snowy (gets assigned value)

// ==============================
