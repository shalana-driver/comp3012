import { IReport } from "../interfaces/IReport";
import { City } from "./City";
import { Clinic } from "./Clinic";
import { HealthMap } from "./HealthMap";
import { Person } from "./Person";
const { EOL } = require("os");

export class ComplexReport implements IReport {
    map: HealthMap

    constructor(map: HealthMap) {
       this.map = map
    }

    printDetails() {
        console.log(EOL)
        this.map.cities.forEach((city: City) => {
            console.log(`City: ${city.name}`)
            console.log('------------------------')
            city.clinics.forEach((clinic: Clinic) => {
                console.log(`${clinic.name}:`)
                if(clinic.queue.queuedPeople.length === 0) {
                    console.log("Queue Empty")
                }
                else {
                    clinic.queue.queuedPeople.forEach((queuedPerson: Person) => {
                        console.log(queuedPerson.fullName)
                    })
                }
                console.log(`Average Wait Time: ${clinic.getCurrentWaitTime()}`)
                console.log(EOL)
            })
        })
    }
    
}