var SignalManager = /** @class */ (function () {
    function SignalManager() {
        this.signals = new Map();
    }
    SignalManager.prototype.createSignal = function (name) {
        if (this.signals.has(name)) {
            throw new Error("Signal with name ".concat(name, " already exists."));
        }
        var signal = new Signal();
        this.signals.set(name, signal);
        return signal;
    };
    SignalManager.prototype.getSignal = function (name) {
        var signal = this.signals.get(name);
        if (!signal) {
            throw new Error("Signal with name ".concat(name, " does not exist."));
        }
        return signal;
    };
    return SignalManager;
}());
var Signal = /** @class */ (function () {
    function Signal() {
        this.listeners = [];
        this.unsubscribeFunctions = [];
    }
    Signal.prototype.subscribe = function (listener) {
        this.listeners.push(listener);
        var unsubscribe = this.createUnsubscribeFunction(listener);
        this.unsubscribeFunctions.push(unsubscribe);
        return unsubscribe;
    };
    Signal.prototype.unsubscribe = function () {
        var unsubscribe = this.unsubscribeFunctions.pop();
        if (unsubscribe) {
            unsubscribe();
        }
    };
    Signal.prototype.emit = function (value) {
        this.listeners.forEach(function (listener) { return listener(value); });
    };
    Signal.prototype.createUnsubscribeFunction = function (listener) {
        var _this = this;
        return function () { return _this.removeListener(listener); };
    };
    Signal.prototype.removeListener = function (listener) {
        this.listeners = this.listeners.filter(function (l) { return l !== listener; });
    };
    return Signal;
}());
export { Signal, SignalManager };
