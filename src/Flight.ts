import { Airline } from "./Airline";
import { Airplane } from "./Airplane";
import { Airport } from "./Airport";
import { BoardingState } from "./states/BoardingState";
import { State } from "./types/State";

export class Flight {
    private state: State;
    public flightnumber: string;
    public airplane: Airplane;
    public airline: Airline;
    public start: Airport;
    public destination: Airport;

    constructor(
        airplane: Airplane,
        airline: Airline,
        flightnumber: string,
        start: Airport,
        destination: Airport,
    ) {
        this.airplane = airplane;
        this.airline = airline;
        this.flightnumber = flightnumber;
        this.start = start;
        this.destination = destination;
        this.state = new BoardingState(this);
    }

    public changeState(state: State) {
        this.state = state;
    }

    public announcement() {
        this.state.announcement();
    }

    public doTask() {
        this.state.doTask();
    }
}
