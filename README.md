<img src="https://github.com/Waves59/signus/blob/main/.images/chauvesouris%20lib.png?raw=true" alt="Signus" width="100%">

# Signus

Framework agnostic signals.

</br>

### Installation

```bash
> npm install signus
> yarn add signus
> pnpm add signus
```

</br>

### Usage

You must create a `SignalManager` instance and use it to create signals.
</br>

### Example

```typescript
import { SignalManager } from "signus";

const signalManager = new SignalManager();
const signal = signalManager.createSignal("mySignal");
signal.subscribe((value) => console.log(value));
signal.emit("Hello world");
```

</br>

### Reuse a signal

If you want to reuse a signal, you can get it from the `SignalManager` instance.

```typescript
import signalManager from "./signalManager";

const signal = signalManager.getSignal("mySignal");
signal.subscribe((value) => console.log(value));
```

</br>

### Remove a signal from the manager

You can remove a signal from the manager by calling the `removeSignal` method.

```typescript
signalManager.removeSignal("mySignal");
```

</br>

### Remove a listener from a signal

You can remove a listener from a signal by calling the `unsubscribe` method.

```typescript
signal.unsubscribe();
```

</br>

### License

MIT
