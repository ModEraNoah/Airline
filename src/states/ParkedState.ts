import { Flight } from "../Flight";
import { State } from "../types/State";

export class ParkedState implements State {
    flight: Flight;

    constructor(flight: Flight) {
        this.flight = flight;
    }
    announcement(): void {
        console.log("[", this.flight.flightnumber, "]", "We are parked");
    }
    doTask(): void {
        this.flight.airline.addPlaneToPool(this.flight.airplane);
        console.log("[", this.flight.flightnumber, "]", "Plane being parked");
    }
}
