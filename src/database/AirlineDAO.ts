import { Airline } from "../Airline";
import { DatabaseConnector } from "./Connector";

export class AirlineDAO {
    private airline: Airline;
    private dbConnection: DatabaseConnector;

    constructor(airline: Airline) {
        this.airline = airline;
        this.dbConnection = new DatabaseConnector();
        this.dbConnection.openConnection();
    }

    public createAirline() {
        let sqlStatement =
            "INSERT INTO airlines (abbreviation, name, rating) VALUES (($1), ($2), ($3));";
        let sqlValues = [
            this.airline.abbreviation,
            this.airline.name,
            this.airline.rating.toString(),
        ];

        this.dbConnection.queryInDatabase(sqlStatement, sqlValues);
    }

    public async getAirlineIdByAbbreviation(
        airlineAbbreviation: string,
    ): Promise<string> {
        let sqlStatement = "SELECT id FROM airlines WHERE abbreviation = ($1);";
        let sqlValues = [airlineAbbreviation];

        let res;
        try {
            res = await this.dbConnection.queryInDatabase(sqlStatement, sqlValues);
        } catch (error) {
            console.error(error);
        }

        if (!res) {
            throw Error("airline undefined");
        }

        return res[0].id as string;
    }
}
