import { Airline } from "../Airline"
import { Airport } from "../Airport"
import { Flight } from "../Flight";
import { A380 } from "../airplanes/A380";
import { Airplane } from "../airplanes/AirplaneFactory"


let testAirline: Airline;

beforeEach(() => {
  testAirline = new Airline("testAirline", "TA", 5.0)
})

describe("Adding a flight", () => {
  let startAirport: Airport
  let destAirport: Airport

  beforeEach(() => {
    startAirport = new Airport("startPort", "SAP", "Europe", "GER")
    destAirport = new Airport("destPort", "DAP", "Europe", "GER")
  })

  test("adding one flight", () => {
    expect(testAirline.readyFlightsQueue.length).toBe(0)
    testAirline.addFlight(startAirport, destAirport, "TF4444")
    expect(testAirline.readyFlightsQueue.length).toBe(1)
  })

  test("adding multiple flights", () => {
    expect(testAirline.readyFlightsQueue.length).toBe(0)
    testAirline.addFlight(startAirport, destAirport, "TF4444")
    testAirline.addFlight(startAirport, destAirport, "TF5555")
    expect(testAirline.readyFlightsQueue.length).toBe(2)
  })
})

describe("Getting an airplane", () => {
  test("no prior plane existing", () => {
    expect(testAirline.airplanePool.length).toBe(0)
    let resPlane = testAirline["getFreeAirplane"]()
    expect(resPlane).toBeInstanceOf(A380)
  })

  test("1 plane existing prior", () => {
    expect(testAirline.airplanePool.length).toBe(0)
    testAirline.addPlaneToPool({ name: "A321" } as Airplane)
    expect(testAirline.airplanePool.length).toBe(1)

    let resPlane = testAirline["getFreeAirplane"]()
    expect(resPlane).toEqual({ name: "A321" })
    expect(testAirline.airplanePool.length).toBe(0)
  })

  test("multiple planes existing prior", () => {
    expect(testAirline.airplanePool.length).toBe(0)
    testAirline.addPlaneToPool({ name: "A321" } as Airplane)
    testAirline.addPlaneToPool({ name: "B321" } as Airplane)
    expect(testAirline.airplanePool.length).toBe(2)

    let resPlane = testAirline["getFreeAirplane"]()
    expect(resPlane).toEqual({ name: "A321" })
    expect(testAirline.airplanePool.length).toBe(1)
  })
})

describe("start a flight", () => {
  test("no flight in queue", () => {
    expect(testAirline.readyFlightsQueue.length).toBe(0)
    expect(() => testAirline["getLatestFlight"]()).toThrowError("No flight in queue!")
  })

  test("flight in queue", () => {
    expect(testAirline.readyFlightsQueue.length).toBe(0)
    testAirline.readyFlightsQueue.enqueue({ flightnumber: "1234" } as Flight)
    expect(testAirline.readyFlightsQueue.length).toBe(1)
    expect(() => testAirline["getLatestFlight"]()).not.toThrowError()
    expect(testAirline.readyFlightsQueue.length).toBe(0)
  })
})

describe("Airplane Pool", () => {
  test("adding an airplane", () => {
    expect(testAirline.airplanePool.length).toBe(0)
    testAirline.addPlaneToPool({} as Airplane)
    expect(testAirline.airplanePool.length).toBe(1)
  })
})
