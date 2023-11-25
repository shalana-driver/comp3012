export class Person {
    phn: string
    fullName: string
    isVaccinated: Boolean
    age: number

    constructor(phn: string, fullName: string, isVaccinated: boolean, age: number) {
        this.phn = phn
        this.fullName = fullName
        this.isVaccinated = isVaccinated
        this.age = age
    }

    vaccinatePerson() {
        this.isVaccinated = true
    }

}