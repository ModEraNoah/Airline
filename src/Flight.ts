import { Airline } from "./Airline";
import { Airport } from "./Airport";
import { Airplane } from "./airplanes/AirplaneFactory";
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
    airlineAbbreviation: Airline,
    flightnumber: string,
    start: Airport,
    destination: Airport,
  ) {
    this.airplane = airplane;
    this.airline = airlineAbbreviation;
    this.flightnumber = flightnumber;
    this.start = start;
    this.destination = destination;
    this.state = new BoardingState(this);
  }

  public changeState(state: State) {
    this.state = state;
    this.doTask();
  }

  public announcement() {
    this.state.announcement();
  }

  public doTask() {
    this.state.doTask();
  }
}
