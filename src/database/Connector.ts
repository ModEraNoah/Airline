import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: "./database.env" });

let config = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
};

import { Client, Pool } from "pg";

export class DatabaseConnector {
    private static client: Pool = new Pool();

    constructor() {
        // this.client = new Client();
    }

    public openConnection() {
        try {
            DatabaseConnector.client.connect();
        } catch (error) {
            console.error(
                "Error while establishing a connection to the database:",
                error,
            );
        }
    }

    public closeConnection() {
        try {
            DatabaseConnector.client.end();
        } catch (error) {
            console.error("Error while closing the connection to the database");
        }
    }

    public async queryInDatabase(query: string, values?: string[]) {
        let res;
        try {
            res = await DatabaseConnector.client
                .query(query, values)
                .then((res) => res.rows);
        } catch (error) {
            console.error("Error while querying in database:", error);
        }
        if (!res) console.error("query result undefined....");
        else {
            console.log(">>>>>>> DB Res for query '", query, "':", res![0]);
            return res;
        }
    }
}

const query = "SELECT * FROM airlines;";
const values = [""];

let c = new DatabaseConnector();
console.log("querying for airlines");

c.openConnection();
console.log("connection opened");
//c.queryInDatabase(query).then(() => c.closeConnection());
