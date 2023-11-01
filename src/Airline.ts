import { Airport } from "./Airport";
import { Flight } from "./Flight";
import { A380 } from "./airplanes/A380";
import { Airplane } from "./airplanes/AirplaneFactory";
import { AirlineDAO } from "./database/AirlineDAO";
import { Queue } from "./types/Queue";

interface IAirline {
    name: string;
    abbreviation: string;
    rating: number;
    readyFlightsQueue: Queue<Flight>;
    // TODO: implement ongoing queue
    ongoingFlightsQueue: Queue<Flight>;
    airplanePool: Queue<Airplane>;

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
    readyFlightsQueue: Queue<Flight>;
    ongoingFlightsQueue: Queue<Flight>;
    airplanePool: Queue<Airplane>;
    private dataAccessObject: AirlineDAO;

    constructor(name: string, abbreviation: string, rating: number) {
        (this.name = name), (this.abbreviation = abbreviation);
        this.rating = rating;
        this.readyFlightsQueue = new Queue<Flight>();
        this.ongoingFlightsQueue = new Queue<Flight>();
        this.airplanePool = new Queue<Airplane>();
        this.dataAccessObject = new AirlineDAO(this);
        this.dataAccessObject.createAirline();
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
            airplane = new A380();
        }

        return airplane;
    }

    public startFlight() {
        const latestFlight = this.getLatestFlight();
        latestFlight.doTask();
    }

    private getLatestFlight() {
        const latestFlight = this.readyFlightsQueue.dequeue();
        if (!latestFlight) throw new Error("No flight in queue!");
        return latestFlight;
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
