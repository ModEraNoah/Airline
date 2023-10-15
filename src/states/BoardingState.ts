import { Flight } from "../Flight";
import { State } from "../types/State";

export class BoardingState implements State {
    flight: Flight;

    constructor(flight: Flight) {
        this.flight = flight;
    }

    announcement(): void {
        throw new Error("Method not implemented.");
    }
    doTask(): void {
        throw new Error("Method not implemented.");
    }
}
