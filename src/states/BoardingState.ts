import { Flight } from "../Flight";
import { State } from "../types/State";
import { TakeoffState } from "./TakeoffState";

export class BoardingState implements State {
    name = "BoardingState";
    flight: Flight;

    constructor(flight: Flight) {
        this.flight = flight;
    }

    announcement(): void {
        console.log(
            "[",
            this.flight.flightnumber,
            "]",
            "Now entering BoardingState",
        );
    }
    async doTask(): Promise<void> {
        this.startBoarding();
        setTimeout(
            () => {
                this.endBoarding;
                this.flight.changeState(new TakeoffState(this.flight));
            },
            Math.floor(Math.random() * 4000 + 1),
        );
    }

    startBoarding() {
        console.log("[", this.flight.flightnumber, "]", "Boarding has started");
    }

    endBoarding() {
        console.log("[", this.flight.flightnumber, "]", "Boarding has ended");
    }
}
