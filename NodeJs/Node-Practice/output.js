const x = "1";
const y = "2";

console.log(x, y);

// Format variable
// %s -> String
// %d -> number
// %i -> integer part
// %o -> object

// console.log("! am %s and my age is %d", "ali", 22);
// console.clear();
// console.count("I am Ali");
// console.count("I am Ali");
// console.count("I am Hassan");
// console.countReset("I am Ali");
// console.count("I am Ali");

const func1 = () => console.trace();
const func2 = () => func1();

func2();
