export class Airplane {
    public name: string;
    public capacity: number;
    public velocity: number;
    public travelHeigth: number;
    public maxDistance: number;

    constructor(
        name: string,
        capacity: number,
        velocity: number,
        travelHeigth: number,
        maxDistance: number,
    ) {
        this.name = name;
        this.capacity = capacity;
        this.velocity = velocity;
        this.travelHeigth = travelHeigth;
        this.maxDistance = maxDistance;
    }

    public startEngine() {
        console.log("airplane starts engine");
        //TODO
    }

    public stopEngine() {
        console.log("airplane stops engine");
        //TODO
    }

    public increaseVelocity(change: number): number {
        this.velocity += change;
        return this.velocity;
    }
    public decreaseVelocity(change: number): number {
        this.velocity -= change;
        return this.velocity;
    }

    public increaseHeight(change: number): number {
        this.travelHeigth += change;
        return this.travelHeigth;
    }
    public decreaseHeight(change: number): number {
        this.travelHeigth -= change;
        return this.travelHeigth;
    }
}
