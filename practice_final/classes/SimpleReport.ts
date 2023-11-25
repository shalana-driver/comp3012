import { EOL } from "os";
import { IReport } from "../interfaces/IReport";
import { HealthMap } from "./HealthMap";
import { City } from "./City";
import { Clinic } from "./Clinic";
import { Person } from "./Person";

export class SimpleReport implements IReport {

    map: HealthMap;

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
                console.log(EOL)
            })
        })
    }
    
}