import { Flight } from "../Flight";
import { State } from "../types/State";
import { ApproachState } from "./ApproachState";

export class FlightState implements State {
    name = "FlightState";
    flight: Flight;

    constructor(flight: Flight) {
        this.flight = flight;
    }
    announcement(): void {
        console.log(
            "[",
            this.flight.flightnumber,
            "]",
            "we are currently on the air",
        );
    }
    doTask(): void {
        console.log("[", this.flight.flightnumber, "]", "finished takeoff");
        setTimeout(
            () => {
                console.log(
                    "[",
                    this.flight.flightnumber,
                    "]",
                    "current travel height:",
                    this.flight.airplane.travelHeigth,
                );
                this.readyForApproach();
            },
            Math.floor(Math.random() * 6000 + 1),
        );
    }

    readyForApproach() {
        setTimeout(() => {
            this.flight.changeState(new ApproachState(this.flight));
        }, 3300);
    }
}
