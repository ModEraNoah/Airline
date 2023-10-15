import { Flight } from "../Flight";
import { State } from "../types/State";

export class LandedState implements State {
    flight: Flight;

    constructor(flight: Flight) {
        this.flight = flight;
    }
    announcement(): void {
        throw new Error("Method not implemented.");
    }
    doTask(): void {
        this.flight.airline.addPlaneToPool(this.flight.airplane);
        throw new Error("Method not implemented.");
    }
}
