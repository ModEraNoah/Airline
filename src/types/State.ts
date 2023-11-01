import { Flight } from "../Flight";

export interface State {
    name: string;
    flight: Flight;
    announcement(): void;
    doTask(): void;
}
