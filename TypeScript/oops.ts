class Vehicle {
  public brand: string;
  public year: number;

  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = year;
  }
}

class Car extends Vehicle {
  public model: string;
  public color: string;
  public isElectric?: boolean;

  constructor(
    brand: string,
    year: number,
    model: string,
    color: string,
    isElectric: boolean
  ) {
    super(brand, year);

    this.model = model;
    this.color = color;
    this.isElectric = isElectric;
  }

  public displayinfo() {
    console.log(
      `Model: ${this.model} -> Brand: ${this.brand} -> Year: ${this.year}`
    );
  }
}

const car1 = new Car("toyota", 2010, "corolla", "gray", false);

// console.log(car1);
// car1.displayinfo();

// =========================
abstract class Shape {
  abstract getArea(): number;

  public display() {
    console.log("Abstract function");
  }
}

class Rectangle extends Shape {
  public radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  getArea(): number {
    return this.radius * 2;
  }
}

const rect1 = new Rectangle(12);
const area = rect1.getArea();

// console.log(area);

// ============================

// interfaces for classes
interface Tree {
  start(): void;
  stop(): void;
}

class Pumpkin implements Tree {
  start(): void {
    console.log("Pumpkin Start");
  }

  stop(): void {
    console.log("pumpkin stop");
  }
}

const test1 = new Pumpkin();
// test1.start();
// test1.stop();

// ============================

// Declaration merging
interface Users {
  name: string;
}

interface Users {
  age: number;
}

const u1: Users = {
  name: "ali",
  age: 22,
};

console.log(u1);
