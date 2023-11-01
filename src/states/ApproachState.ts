import { Flight } from "../Flight";
import { State } from "../types/State";
import { LandedState } from "./LandedState";

export class ApproachState implements State {
    name = "ApproachState";
    flight: Flight;

    constructor(flight: Flight) {
        this.flight = flight;
    }
    announcement(): void {
        console.log(
            "[",
            this.flight.flightnumber,
            "]",
            "we are currently approaching",
        );
    }
    doTask(): void {
        console.log("[", this.flight.flightnumber, "]", "start approach");
        setTimeout(
            () => {
                console.log(
                    "[",
                    this.flight.flightnumber,
                    "]",
                    "approach finished. Landing successful",
                );
                this.flight.changeState(new LandedState(this.flight));
            },
            Math.floor(Math.random() * 3430 + 1),
        );
    }
}
