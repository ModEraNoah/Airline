import { Flight } from "../Flight";

export interface State {
    flight: Flight;
    announcement(): void;
    doTask(): void;
}
