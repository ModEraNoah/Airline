import { Airplane } from "./Airplane";
import { Airport } from "./Airport";
import { Flight } from "./Flight";

interface IAirline {
    name: string;
    abbreviation: string;
    rating: number;
    currentFlights: List<Flight>;
    addFlight(
        start: Airport,
        destination: Airport,
        airplane: Airplane,
        flightnumber: number,
    ): Flight;
    getCurrentFlights(): Flight[];
    getSpecificFlight(flightnumber: number): Flight;
}
export class Airline implements IAirline {
    name: string;
    abbreviation: string;
    rating: number;
    currentFlights: List<Flight>;

    constructor(
        name: string,
        abbreviation: string,
        rating: number,
        currentFlights: null,
    ) {
        (this.name = name), (this.abbreviation = abbreviation);
        this.rating = rating;
        this.currentFlights = currentFlights;
    }

    addFlight(
        start: Airport,
        destination: Airport,
        airplane: Airplane,
        flightnumber: number,
    ) {
        throw new Error("Method not implemented.");
    }
    getCurrentFlights(): Flight[] {
        throw new Error("Method not implemented.");
    }
    getSpecificFlight(flightnumber: number) {
        throw new Error("Method not implemented.");
    }
}
