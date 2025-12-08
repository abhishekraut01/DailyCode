// A generic in-memory store using TypeScript
class InMemoryStore<T = any> {
    private store: Map<string, T>;

    constructor() {
        this.store = new Map();
    }

    get(key: string): T | null {
        return this.store.has(key) ? this.store.get(key)! : null;
    }

    set(key: string, value: T): void {
        this.store.set(key, value);
    }

    delete(key: string): void {
        this.store.delete(key);
    }

    has(key: string): boolean {
        return this.store.has(key);
    }

    clear(): void {
        this.store.clear();
    }

    size(): number {
        return this.store.size;
    }
}

export const inMemoryDb = new InMemoryStore();
