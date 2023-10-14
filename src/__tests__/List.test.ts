import { List } from "../types/List";

test("only one item", () => {
    let list = new List<number>();
    expect(list.length).toBe(0);

    list.enqueue(3);
    expect(list.length).toBe(1);

    expect(list.dequeue()).toBe(3);
});

describe("multiple items", () => {
    const list = new List<number>();

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
