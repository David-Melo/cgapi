"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyClass {
    constructor() {
        this.name = 'bob';
    }
    static get getName() {
        return this.name;
    }
}
exports.default = MyClass;
