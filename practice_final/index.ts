import { ComplexReport } from './classes/ComplexReport';
import { HealthMap } from './classes/HealthMap';
import { ReportMaker } from './classes/ReportMaker';
const fs = require("fs/promises");
let currentIntake = 25;
//ts-node index.ts

async function main() {

  const map = new HealthMap("data.json")

  map.readMapData()
    .then(() => map.printMap())
    .then(() => console.log("---End of Map---"))
    .then(() => map.registerForShots(currentIntake))
    .then(() => (new ReportMaker (new ComplexReport(map)).printDetails()))
    .then(() => console.log("---End of Report---"))
    .then(() => map.printMap())
    .then(() => console.log("---End of Map---"))
    .catch((err) => console.log(err));
}

main();