import { Airline } from "./Airline";
import { Airport } from "./Airport";
import { Airplane } from "./airplanes/AirplaneFactory";
import { FlightDAO } from "./database/FlightDAO";
import { BoardingState } from "./states/BoardingState";
import { State } from "./types/State";

export class Flight {
  private state: State;
  public flightnumber: string;
  public airplane: Airplane;
  public airline: Airline;
  public start: Airport;
  public destination: Airport;
  private dataAccessObject: FlightDAO;

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
    this.dataAccessObject = new FlightDAO(this);
    this.dataAccessObject.createFlight();
  }

  public changeState(state: State) {
    this.state = state;
    this.dataAccessObject.updateState();
    this.doTask();
  }

  public announcement() {
    this.state.announcement();
  }

  public doTask() {
    this.state.doTask();
  }
}
