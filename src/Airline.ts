import { Airplane } from "./Airplane";
import { Airport } from "./Airport";
import { Flight } from "./Flight";
import { List } from "./types/List";

interface IAirline {
    name: string;
    abbreviation: string;
    rating: number;
    currentFlights: List<Flight>;
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
    currentFlights: List<Flight>;
    airplanePool: List<Airplane>;

    constructor(name: string, abbreviation: string, rating: number) {
        (this.name = name), (this.abbreviation = abbreviation);
        this.rating = rating;
        this.currentFlights = new List<Flight>();
        this.airplanePool = new List<Airplane>();
    }

    addFlight(
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
        this.currentFlights.enqueue(newFlight);
        return newFlight;
    }

    startFlight() {
        let latestFlight = this.currentFlights.dequeue();
        if (!latestFlight) throw new Error("No flight in queue!");
        latestFlight.doTask();
    }

    getCurrentFlights(): Flight[] {
        throw new Error("Method not implemented.");
    }
    getSpecificFlight(flightnumber: number): Flight {
        throw new Error("Method not implemented.");
    }

    getFreeAirplane(): Airplane {
        let airplane: Airplane | null;
        airplane = this.airplanePool.dequeue();
        if (!airplane) {
            airplane = new Airplane("A380", 250, 500, 32000, 5000);
        }

        return airplane;
    }

    addPlaneToPool(plane: Airplane): void {
        this.airplanePool.enqueue(plane);
    }
}
