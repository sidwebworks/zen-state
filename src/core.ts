type ZenState<T = any> = {
  value: T
  subscribers: Set<Listener<T>>
}

// Symbol for internal method, NOT FOR CONSUMERS
const kZenInit = Symbol("kZenInit")

export type Zen<T = any> = {
  [kZenInit]: () => void
  read(): T
  write(next: Updater<T>): void
  subscribe(listener: Listener<T>): () => void
}

export type Listener<T> = (data: T) => void

export type Updater<T> = T | ((prev: T) => T)

const noop = () => {}

// Type guard to check if an type is `callable`
function isCallable<T>(thing: unknown): thing is T & Function {
  return typeof thing === "function"
}

// Store a WeakMap to allow garbage collection
const internal_store = new WeakMap<Zen, ZenState>()

export function zen<T>(initialValue: T): Zen<T> {
  const value: Zen<T> = {
    [kZenInit]() {
      if (!internal_store.has(this)) {
        internal_store.set(this, {
          value: initialValue,
          subscribers: new Set(),
        })
      }
    },
    read() {
      return internal_store.get(this)!.value
    },
    write(next: Updater<T>) {
      const state = internal_store.get(this) as ZenState<T>

      // If current state and next state are the same, bail out
      if (!state || Object.is(state.value, next)) return

      state.value = isCallable(next) ? next(state.value) : next

      internal_store.set(this, state)

      // Notify all the subscribers about the state update
      state.subscribers.forEach((sub) => sub(state.value))
    },
    subscribe(listener: Listener<T>) {
      const state = internal_store.get(this)

      if (!state) return noop

      state.subscribers.add(listener)

      // Cleanup function
      return () => {
        state.subscribers.delete(listener)
      }
    },
  }

  value[kZenInit]() // Initialize zen object

  return value
}
