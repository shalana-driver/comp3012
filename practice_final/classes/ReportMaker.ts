import { IReport } from "../interfaces/IReport";

export class ReportMaker {

    report: IReport;

    constructor(report: IReport) {
        this.report = report
    }

    printDetails() {
        this.report.printDetails();
    }
}