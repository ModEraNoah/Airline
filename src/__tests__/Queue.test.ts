import { Queue } from "../types/Queue";

test("only one item", () => {
    let list = new Queue<number>();
    expect(list.length).toBe(0);

    list.enqueue(3);
    expect(list.length).toBe(1);

    expect(list.dequeue()).toBe(3);
});

describe("multiple items", () => {
    const list = new Queue<number>();

    test("enqueue multiple items", () => {
        list.enqueue(3);
        list.enqueue(42);
        list.enqueue(69);
        expect(list.length).toBe(3);
    });

    test("dequeue multiple items", () => {
        expect(list.dequeue()).toBe(3);
        expect(list.dequeue()).toBe(42); //42

        expect(list.length).toBe(1);
    });

    test("empty list after dequeuing", () => {
        expect(list.dequeue()).toBe(69);
        expect(list.length).toBe(0);

        expect(list.dequeue()).toBeNull();
    });

    test("enqueing and dequeuing to emptied list", () => {
        list.enqueue(1411);
        expect(list.length).toBe(1);
        expect(list.dequeue()).toBe(1411);

        list.enqueue(100);

        expect(list.dequeue()).toBe(100);
    });
});

describe("getting a specific node-value by index", () => {
    test("empty queue index 0", () => {
        let testQueue: Queue<number> = new Queue<number>();
        expect(() => testQueue.getNodeValueByIndex(0)).toThrowError();
    });

    test("empty queue index > 0", () => {
        let testQueue: Queue<number> = new Queue<number>();
        expect(() => testQueue.getNodeValueByIndex(3)).toThrowError();
    });

    test("negative index", () => {
        let testQueue: Queue<number> = new Queue<number>();
        expect(() => testQueue.getNodeValueByIndex(-1)).toThrowError();
    });

    describe("queue of length 1", () => {
        let testQueue: Queue<number> = new Queue<number>();
        testQueue.enqueue(1411);
        expect(testQueue.length).toBe(1);

        test("index 0", () => {
            expect(testQueue.getNodeValueByIndex(0)).toBe(1411);
        });

        test("index > 0", () => {
            expect(() => testQueue.getNodeValueByIndex(1)).toThrowError();
        });
    });

    describe("queue of length 2", () => {
        let testQueue: Queue<number> = new Queue<number>();
        testQueue.enqueue(1411);
        testQueue.enqueue(420);
        expect(testQueue.length).toBe(2);

        test("index 0", () => {
            expect(testQueue.getNodeValueByIndex(0)).toBe(1411);
        });

        test("index 1", () => {
            expect(testQueue.getNodeValueByIndex(1)).toBe(420);
        });
    });

    describe("queue of length > 2", () => {
        let testQueue: Queue<number> = new Queue<number>();
        testQueue.enqueue(1411);
        testQueue.enqueue(420);
        testQueue.enqueue(69);
        testQueue.enqueue(42);
        expect(testQueue.length).toBe(4);

        test("index 0", () => {
            expect(testQueue.getNodeValueByIndex(0)).toBe(1411);
        });

        test("last index", () => {
            expect(testQueue.getNodeValueByIndex(testQueue.length - 1)).toBe(42);
        });

        test("somewhere in the middle", () => {
            expect(testQueue.getNodeValueByIndex(2)).toBe(69);
        });
    });
});

describe("getting all nodes", () => {
    //TODO
    // throw new Error("Method not implemented.");
});
