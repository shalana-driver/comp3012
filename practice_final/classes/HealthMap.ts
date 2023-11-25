import { City } from "./City";
import { Clinic } from "./Clinic";
import { Household } from "./Household";
import { Person } from "./Person";

/* I know there is a lot of code duplication here so if I had longer
I would create functions to deal with the logic that needs to be done for
each city and then implement those functions eliminate the code duplication.
This could be done in the readMapData(), printMap(), and registerForShots()
functions.
*/

const fs = require("fs/promises");

export class HealthMap {

	private _mapData: any
  private _jsonData: any
  private _burnaby: City
  private _vancouver: City
  private _richmond: City
  private _largestCity: any
  cities: City[]
  

  constructor(mapData: any) {
    this._mapData = mapData
    this._burnaby = new City("Burnaby")
    this._vancouver = new City("Vancouver")
    this._richmond = new City("Richmond")
    this.cities = [this._burnaby, this._vancouver, this._richmond]
  }

  readMapData(): Promise<void> {
    return fs.readFile(this._mapData, "utf8")
      .then((data: string) => {
        this._jsonData = JSON.parse(data)
      })
      .then(() => {        
        const burnabyClinics = this._jsonData.city.Burnaby.clinics

        burnabyClinics.forEach((clinic: any) => {
          const newClinic = new Clinic(this._burnaby, clinic.name, clinic.staff, clinic.blockNum)
          this._burnaby.addClinic(newClinic)
        })

        const burnabyHouseholds = this._jsonData.city.Burnaby.households

        burnabyHouseholds.forEach((household: any) => {
          const newHousehold = new Household(this._burnaby, household.blockNum)
          household.inhabitants.forEach((person: any) => {
            const newPerson = new Person(person.phn, person.fullName, person.isVaccinated, person.age)
            newHousehold.addPerson(newPerson)
          })
          this._burnaby.addHousehold(newHousehold)
        })

        const vancouverClinics = this._jsonData.city.Vancouver.clinics

        vancouverClinics.forEach((clinic: any) => {
          const newClinic = new Clinic(this._vancouver, clinic.name, clinic.staff, clinic.blockNum)
          this._vancouver.addClinic(newClinic)
        })

        const vancouverHouseholds = this._jsonData.city.Vancouver.households

        vancouverHouseholds.forEach((household: any) => {
          const newHousehold = new Household(this._vancouver, household.blockNum)
          household.inhabitants.forEach((person: any) => {
            const newPerson = new Person(person.phn, person.fullName, person.isVaccinated, person.age)
            newHousehold.addPerson(newPerson)
          })
          this._vancouver.addHousehold(newHousehold)
        })

        const richmondClinics = this._jsonData.city.Richmond.clinics

        richmondClinics.forEach((clinic: any) => {
          const newClinic = new Clinic(this._richmond, clinic.name, clinic.staff, clinic.blockNum)
          this._richmond.addClinic(newClinic)
        })

        const richmondHouseholds = this._jsonData.city.Richmond.households

        richmondHouseholds.forEach((household: any) => {
          const newHousehold = new Household(this._richmond, household.blockNum)
          household.inhabitants.forEach((person: any) => {
            const newPerson = new Person(person.phn, person.fullName, person.isVaccinated, person.age)
            newHousehold.addPerson(newPerson)
          })
          this._richmond.addHousehold(newHousehold)
        })
      })
      .catch((err: Error) => {
        console.error("Error reading JSON file:", err);
        throw err;
      });
  }

  printMap() {

    const burnabyBlocks = this._burnaby.clinics.length + this._burnaby.households.length
    const vancouverBlocks = this._vancouver.clinics.length + this._vancouver.households.length
    const richmondBlocks = this._richmond.clinics.length + this._richmond.households.length
    this._largestCity = Math.max(burnabyBlocks,vancouverBlocks,richmondBlocks)
    const burnabySymbolMap = new Array(this._largestCity).fill("X")
    const vancouverSymbolMap = new Array(this._largestCity).fill("X")
    const richmondSymbolMap = new Array(this._largestCity).fill("X")

    this._burnaby.clinics.forEach((clinic: Clinic) => {
      burnabySymbolMap[clinic.blockNum] = "C"
    })

    this._burnaby.households.forEach((household: Household) => {
      let fullVaccinated = true
      household.inhabitants.forEach((person) => {
        if (!person.isVaccinated) {
          fullVaccinated = false
        }
      })
      if (fullVaccinated) {
        burnabySymbolMap[household.blockNum] = "F"
      }
      else {
        burnabySymbolMap[household.blockNum] = "H"
      }
      
    })


    this._vancouver.clinics.forEach((clinic: Clinic) => {
      vancouverSymbolMap[clinic.blockNum] = "C"
    })
    
    this._vancouver.households.forEach((household: Household) => {
      let fullVaccinated = true
      household.inhabitants.forEach((person) => {
        if (!person.isVaccinated) {
          fullVaccinated = false
        }
      })
      if (fullVaccinated) {
        vancouverSymbolMap[household.blockNum] = "F"
      }
      else {
        vancouverSymbolMap[household.blockNum] = "H"
      }
      
    })

    this._richmond.clinics.forEach((clinic: Clinic) => {
      richmondSymbolMap[clinic.blockNum] = "C"
    })
    
    this._richmond.households.forEach((household: Household) => {
      let fullVaccinated = true
      household.inhabitants.forEach((person) => {
        if (!person.isVaccinated) {
          fullVaccinated = false
        }
      })
      if (fullVaccinated) {
        richmondSymbolMap[household.blockNum] = "F"
      }
      else {
        richmondSymbolMap[household.blockNum] = "H"
      }
      
    })

    const symbolMatrix = [
      burnabySymbolMap, 
      vancouverSymbolMap, 
      richmondSymbolMap
    ]
    console.log(symbolMatrix)

  }

  registerForShots(currentIntake: number) {
    this._burnaby.households.forEach((household: Household) => {
      household.inhabitants.forEach((person) => {
        if (!person.isVaccinated && person.age >= currentIntake) {
          let distance = this._largestCity
          let closestClinic: Clinic
          this._burnaby.clinics.forEach((clinic: Clinic) => {
            if(Math.abs(household.blockNum - clinic.blockNum) < distance) {
              distance = Math.abs(household.blockNum - clinic.blockNum)
              closestClinic = clinic
            }
          })
          closestClinic!.queue.enqueue(person)
          person.vaccinatePerson()
        }
      })
    })
    this._vancouver.households.forEach((household: Household) => {
      household.inhabitants.forEach((person) => {
        if (!person.isVaccinated && person.age >= currentIntake) {
          let distance = this._largestCity
          let closestClinic: Clinic
          this._vancouver.clinics.forEach((clinic: Clinic) => {
            if(Math.abs(household.blockNum - clinic.blockNum) < distance) {
              distance = Math.abs(household.blockNum - clinic.blockNum)
              closestClinic = clinic
            }
          })
          closestClinic!.queue.enqueue(person)
          person.vaccinatePerson()
        }
      })
    })
    this._richmond.households.forEach((household: Household) => {
      household.inhabitants.forEach((person) => {
        if (!person.isVaccinated && person.age >= currentIntake) {
          let distance = this._largestCity
          let closestClinic: Clinic
          this._richmond.clinics.forEach((clinic: Clinic) => {
            if(Math.abs(household.blockNum - clinic.blockNum) < distance) {
              distance = Math.abs(household.blockNum - clinic.blockNum)
              closestClinic = clinic
            }
          })
          closestClinic!.queue.enqueue(person)
          person.vaccinatePerson()
        }
      })
    })
  }
}