import { Flight } from "../Flight";
import { State } from "../types/State";
import { ParkedState } from "./ParkedState";

export class LandedState implements State {
    flight: Flight;

    constructor(flight: Flight) {
        this.flight = flight;
    }
    announcement(): void {
        console.log("[", this.flight.flightnumber, "]", "We have landed the eagle");
    }
    doTask(): void {
        this.flight.airplane.stopEngine();
        setTimeout(
            () => {
                this.flight.airline.addPlaneToPool(this.flight.airplane);
                console.log(
                    "[",
                    this.flight.flightnumber,
                    "]",
                    "Plane of flight",
                    this.flight.flightnumber,
                    "ready for another ride",
                );
                this.flight.changeState(new ParkedState(this.flight));
            },
            Math.floor(Math.random() * 2000 + 1),
        );
    }
}
