import { Flight } from "../Flight";
import { State } from "../types/State";
import { FlightState } from "./FlightState";

export class TakeoffState implements State {
    name = "TakeoffState";
    flight: Flight;

    constructor(flight: Flight) {
        this.flight = flight;
    }
    announcement(): void {
        console.log("[", this.flight.flightnumber, "]", "ready for takeoff");
    }
    doTask(): void {
        setTimeout(() => {
            this.startEngine();
            this.takeOff();
        }, 1000);
    }

    startEngine() {
        this.flight.airplane.startEngine();
        console.log("[", this.flight.flightnumber, "]", "Engine started");
    }

    takeOff() {
        setTimeout(
            () => {
                console.log("[", this.flight.flightnumber, "]", "Starting takeoff");
                this.flight.changeState(new FlightState(this.flight));
            },
            Math.floor(Math.random() * 3000 + 1),
        );
    }
}
