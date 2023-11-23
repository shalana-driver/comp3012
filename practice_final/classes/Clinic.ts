import { WaitlistQueue } from "./WaitlistQueue"

export class Clinic {
    city: string
    staff: number
    block: number
    queue: WaitlistQueue

    constructor(city: string, staff: number, block: number, queue: WaitlistQueue) {
        this.city = city,
        this.staff = staff,
        this.block = block,
        this.queue = queue
    }

    getCurrentWaitTime() {
        
    }
}