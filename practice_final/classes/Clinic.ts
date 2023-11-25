import { IBuilding } from "../interfaces/IBuilding"
import { City } from "./City"
import { WaitListQueue } from "./WaitListQueue"

export class Clinic implements IBuilding {
    city: City
    name: string
    staff: number
    blockNum: number
    queue: WaitListQueue

    constructor(city: City, name: string, staff: number, blockNum: number) {
        this.city = city,
        this.name = name,
        this.staff = staff,
        this.blockNum = blockNum
        this.queue = new WaitListQueue()
    }

    getCurrentWaitTime() {
        return `${this.queue.size()*15} min`
    }
}