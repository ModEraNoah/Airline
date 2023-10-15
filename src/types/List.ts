export class Node<T> {
    next: Node<T> | null;
    value: T;

    constructor(value: T, next: Node<T> | null = null) {
        this.next = next;
        this.value = value;
    }
}
export class List<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    public length: number;

    constructor() {
        this.head = this.tail = null;
        this.length = 0;
    }

    public enqueue(element: T) {
        this.length++;
        if (!this.tail) {
            this.head = this.tail = new Node<T>(element);
            return;
        }
        this.tail.next = new Node<T>(element);
        this.tail = this.tail.next;
    }

    public dequeue(): T | null {
        if (this.length === 0) {
            //throw new Error("No element in List");
            return null;
        }

        let element: T;
        if (this.length === 1) {
            element = this.head!.value;
            this.head = this.tail = null;
        } else {
            element = this.head!.value;
            this.head = this.head!.next;
        }

        this.length--;
        return element;
    }

    public getSpecificNode(index: number): T {
        //TODO: searching for specific Node in List
        throw new Error("Method not implemented.");
    }

    public getAllNodes(): T[] {
        //TODO: returning all Nodes in list (i.e. their values)
        throw new Error("Method not implemented.");
    }
}
