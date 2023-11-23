import { HealthMap } from './classes/HealthMap';
import * as data from './data.json' //ignoring async for now
let currentIntake = 50; //make global?
//ts-node index.ts

async function main() {
  const map = new HealthMap(data)
  map.printMap();
  console.log("---End of Map---")
  map.registerForShots();
//   const report = new ReportMaker(new ComplexReport(map));
//   report.printDetails();
  console.log("---End of Report---")
  map.printMap();
  console.log("---End of Map---")
}

main();

/*class Map {
	private _mapData;
    constructor(filename) {//don't need to use the constructor, can create method (ex. buildMap) and then call that method, or call function in constructor
        FileSystem.readFile(filename,'utf8') //can't use readFileSync
        .then(data => JSON.parse(data))
        .then(dataAsObj => {
            this._mapData = dataAsObj
        })
    }
  // constructors, methods, etc
  printMap() {

  }
}

async function main() {
  const map = new Map("data.json") //right now this will run before the data has been stored
  map.printMap();
  console.log("---End of Map---")
  map.registerForShots();
  const report = new ReportMaker(new ComplexReport(map));
  report.printDetails();
  console.log("---End of Report---")
  map.printMap();
  console.log("---End of Map---")
}

main();*/