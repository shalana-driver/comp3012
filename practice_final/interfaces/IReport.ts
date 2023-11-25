import { HealthMap } from "../classes/HealthMap"

export interface IReport {
    map: HealthMap
    printDetails(): void
}