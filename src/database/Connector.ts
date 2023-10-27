import * as dotenv from "dotenv";
dotenv.config({ path: "../database.env" });

let config = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
};

import { Client } from "pg";

export class DatabaseConnector {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public openConnection() {
        try {
            this.client.connect();
        } catch (error) {
            console.error(
                "Error while establishing a connection to the database:",
                error,
            );
        }
    }

    public closeConnection() {
        try {
            this.client.end();
        } catch (error) {
            console.error("Error while closing the connection to the database");
        }
    }

    public async queryInDatabase(query: string, values?: string[]) {
        try {
            //@ts-ignore
            return await this.client.query(query, values);
        } catch (error) {
            console.error("Error while querying in database:", error);
        }
    }
}

const query = "SELECT * FROM public.airlines;";
const values = [""];

let c = new DatabaseConnector();

c.openConnection();
c.queryInDatabase(query)
    .then((res) => console.log(res?.rows))
    .then(() => c.closeConnection());
//TODO
