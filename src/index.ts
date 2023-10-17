import { Airline } from "./Airline";
import { Airport } from "./Airport";

const LAX = new Airport("LA Int. Airport", "LAX", "North America", "USA");
const FRA = new Airport("Flughafen Frankfurt", "FRA", "Europe", "GER");

const bryanair = new Airline("Bryanair", "BRY", 3.2);

bryanair.addFlight(LAX, FRA, "BR1411", 32000);
bryanair.addFlight(FRA, FRA, "BR1234", 31000);

try {
    bryanair.startFlight();
    bryanair.startFlight();
    bryanair.startFlight();
} catch (error) {
    console.log("tried to started more flights than there are");
}
