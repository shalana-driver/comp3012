export class Person {
    phn: string
    name: string
    vaccinated: boolean
    age: number

    constructor(phn: string, name: string, vaccinated: boolean, age: number) {
        this.phn = phn
        this.name = name
        this.vaccinated = vaccinated
        this.age = age
    }

}