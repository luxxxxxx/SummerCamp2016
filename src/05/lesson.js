// function Animal () {
//     this.shared = 'animal';
// }
// function Person (x, y) {
//     this.name = x;
//     this.sex = y;
// }
// Animal.prototype.live = function () {
//     console.log('love live')
// }

// Person.prototype.eat = function (argument) {
//     console.log('eat')
// }
// Person.prototype = new Animal();

// var person1 = new Person('dsa', 'male');
class Animal {
    constructor (x, y) {
        this.name = 'sfsdf';
        this.sex = 'sfad';
    }
    eat () {
        console.log('eat');
    }
}
class Person extends Animal {
    constructor (x, y) {
        super(x, y);
        this.name = 'per1'
    }
    drink () {
        console.log('drink');
    }
}
let person1 = new Person();