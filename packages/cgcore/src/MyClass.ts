export default class MyClass {

    name: string = 'bob';

    static get getName (): string {
        return this.name;
    }

}