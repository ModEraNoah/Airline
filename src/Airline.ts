import { Airport } from "./Airport";
import { Flight } from "./Flight";
import { A380 } from "./airplanes/A380";
import { Airplane } from "./airplanes/AirplaneFactory";
import { List } from "./types/List";

interface IAirline {
    name: string;
    abbreviation: string;
    rating: number;
    readyFlightsQueue: List<Flight>;
    // TODO: implement ongoing queue
    ongoingFlightsQueue: List<Flight>
    airplanePool: List<Airplane>;

    addFlight(
        start: Airport,
        destination: Airport,
        flightnumber: string,
        travelheight: number,
    ): Flight;
    getCurrentFlights(): Flight[];
    getSpecificFlight(flightnumber: number): Flight;
}
export class Airline implements IAirline {
    name: string;
    abbreviation: string;
    rating: number;
    readyFlightsQueue: List<Flight>;
    ongoingFlightsQueue: List<Flight>;
    airplanePool: List<Airplane>;

    constructor(name: string, abbreviation: string, rating: number) {
        (this.name = name), (this.abbreviation = abbreviation);
        this.rating = rating;
        this.readyFlightsQueue = new List<Flight>();
        this.ongoingFlightsQueue = new List<Flight>()
        this.airplanePool = new List<Airplane>();
    }

    public addFlight(
        start: Airport,
        destination: Airport,
        flightnumber: string,
        travelheight?: number,
    ): Flight {
        const airplane = this.getFreeAirplane();
        const newFlight = new Flight(
            airplane,
            this,
            flightnumber,
            start,
            destination,
        );
        this.readyFlightsQueue.enqueue(newFlight);
        return newFlight;
    }

    private getFreeAirplane(): Airplane {
        let airplane: Airplane | null;
        airplane = this.airplanePool.dequeue();
        if (!airplane) {
            airplane = new A380()
        }

        return airplane;
    }

    public startFlight() {
        const latestFlight = this.getLatestFlight()
        latestFlight.doTask();
    }

    private getLatestFlight() {
        const latestFlight = this.readyFlightsQueue.dequeue();
        if (!latestFlight) throw new Error("No flight in queue!");
        return latestFlight
    }

    public getCurrentFlights(): Flight[] {
        throw new Error("Method not implemented.");
    }

    public getSpecificFlight(flightnumber: number): Flight {
        throw new Error("Method not implemented.");
    }

    public addPlaneToPool(plane: Airplane): void {
        this.airplanePool.enqueue(plane);
    }
}
