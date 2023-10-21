import { Airplane } from "./AirplaneFactory";
import { v4 as UUID } from "uuid"

export class A380 extends Airplane {
  private id: string
  constructor() {
    super("A380", 300, 500, 3200, 6000)
    this.id = UUID();
  }
}
