class Shape {
    constructor(name) {
        this.name = name;
    }

    area() {
        console.log(`Area calculation not implemented for ${this.name}.`);
    }
}

class Circle extends Shape {
    constructor(name, radius) {
        super(name);
        this.radius = radius;
    }

    area() {
        console.log(`Area of Circle: ${Math.PI * this.radius * this.radius}`);
    }
}

class Rectangle extends Shape {
    constructor(name, width, height) {
        super(name);
        this.width = width;
        this.height = height;
    }

    area() {
        console.log(`Area of Rectangle: ${this.width * this.height}`);
    }
}

class Triangle extends Shape {
    constructor(name, base, height) {
        super(name);
        this.base = base;
        this.height = height;
    }

    area() {
        console.log(`Area of Triangle: ${(this.base * this.height) / 2}`);
    }
}

const genericShape = new Shape("Generic Shape");
const circle = new Circle("Circle", 5);
const rectangle = new Rectangle("Rectangle", 4, 6);
const triangle = new Triangle("Triangle", 3, 4);

genericShape.area();
circle.area();
rectangle.area();
triangle.area();
