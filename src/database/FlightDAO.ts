import { Airport } from "../Airport";
import { Flight } from "../Flight";
import { DatabaseConnector } from "./Connector";

export class FlightDAO {
    private flight: Flight;
    private dbConnection: DatabaseConnector;

    constructor(flight: Flight) {
        this.flight = flight;
        this.dbConnection = new DatabaseConnector();
    }

    public async createFlight() {
        let sqlStatement =
            "INSERT INTO flights (flightnumber, airline_id, start_airport_id, dest_airport_id, state) VALUES(($1), ($2), ($3), ($4), ($5));";

        let airlineId = await this.flight.airline[
            "dataAccessObject"
        ].getAirlineIdByAbbreviation(this.flight.airline.abbreviation);

        let startAirportId = await this.getAirportId(this.flight.start);
        let destAirportId = await this.getAirportId(this.flight.destination);

        let sqlValues = [
            this.flight.flightnumber,
            airlineId,
            startAirportId!,
            destAirportId!,
            this.flight["state"].name,
        ];

        await this.dbConnection.queryInDatabase(sqlStatement, sqlValues);
    }

    public async updateState() {
        let sqlStatement =
            "UPDATE flights SET state = ($1) WHERE flightnumber = ($2);";

        let sqlValues = [this.flight["state"].name, this.flight.flightnumber];

        await this.dbConnection.queryInDatabase(sqlStatement, sqlValues);
    }

    private async getAirportId(start: Airport): Promise<string> {
        let sqlStatement = "SELECT id FROM airports WHERE abbreviation = ($1);";
        let sqlValues = [start.abbreviation];

        let res;
        try {
            res = await this.dbConnection.queryInDatabase(sqlStatement, sqlValues);
        } catch (error) {
            console.error(error);
        }

        if (res == undefined) {
            throw Error("undefined airport");
        }

        return res[0].id as string;
    }
}
