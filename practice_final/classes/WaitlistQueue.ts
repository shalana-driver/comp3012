import { Person } from "./Person";

export class WaitListQueue {

    queuedPeople: Person[]
    size(): number

    size() {
        return this.queuedPeople.length
    }

    enqueue(person: Person) {
        this.queuedPeople.push(person)
    }
    dequeue() {
        if (this.size() === 0) {
            return "Cannot dequeue: Queue Empty";
        }
        return this.queuedPeople.shift();
    }

    constructor() {
        this.queuedPeople = [];
      }
    
}