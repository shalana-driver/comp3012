import { Clinic } from "./Clinic";
import { Household } from "./Household";

export class City {
    name: string
    clinics: Clinic[]
    households: Household[]

    constructor(name: string) {
        this.name = name
        this.clinics = []
        this.households = []
    }

    addClinic(clinic: Clinic) {
        this.clinics.push(clinic)
    }

    addHousehold(household: Household) {
        this.households.push(household)
    }
}