type Listener<T> = (value: T) => void;

class SignalManager {
    private signals: Map<string, Signal<any>> = new Map();

    createSignal<T>(name: string): Signal<T> {
        if (this.signals.has(name)) {
            throw new Error(`Signal with name ${name} already exists.`);
        }
        const signal = new Signal<T>();
        this.signals.set(name, signal);
        return signal;
    }

    getSignal<T>(name: string): Signal<T> {
        const signal = this.signals.get(name);
        if (!signal) {
            throw new Error(`Signal with name ${name} does not exist.`);
        }
        return signal as Signal<T>;
    }
}

class Signal<T> {
    private listeners: Listener<T>[] = [];
    private unsubscribeFunctions: (() => void)[] = [];

    subscribe(listener: Listener<T>): () => void {
        this.listeners.push(listener);
        const unsubscribe = this.createUnsubscribeFunction(listener);
        this.unsubscribeFunctions.push(unsubscribe);
        return unsubscribe;
    }

    unsubscribe(): void {
        const unsubscribe = this.unsubscribeFunctions.pop();
        if (unsubscribe) {
            unsubscribe();
        }
    }

    emit(value: T): void {
        this.listeners.forEach(listener => listener(value));
    }

    private createUnsubscribeFunction(listener: Listener<T>): () => void {
        return () => this.removeListener(listener);
    }

    private removeListener(listener: Listener<T>): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
}

export { Signal, SignalManager };
