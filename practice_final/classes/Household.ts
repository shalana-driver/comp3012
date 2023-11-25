import { IBuilding } from "../interfaces/IBuilding"
import { City } from "./City"
import { Person } from "./Person"

export class Household implements IBuilding {
    city: City
    blockNum: number
    inhabitants: Person[]

    constructor(city: City, blockNum: number, inhabitants?: Person[]) {
        this.city = city,
        this.blockNum = blockNum
        this.inhabitants = []
    }

    addPerson(person: Person) {
        this.inhabitants.push(person)
        return this.inhabitants
    }
}