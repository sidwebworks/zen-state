export type Zen<T = any> = {
  read(): T
  write(next: Updater<T>): void
  subscribe(listener: Listener<T>): () => void
}

type ZenState<T = any> = {
  value: T
  subscribers: Set<any>
}

export type Listener<T> = (data: T) => void

export type Updater<T> = T | ((prev: T) => T)

const noop = () => {}

function isCallable<T>(thing: unknown): thing is T & Function {
  return typeof thing === "function"
}

const internal_store = new WeakMap<Zen, ZenState>()

export function zen<T>(initialValue: T): Zen<T> {
  return {
    read() {
      if (!internal_store.has(this)) {
        internal_store.set(this, {
          value: initialValue,
          subscribers: new Set(),
        })
      }

      return internal_store.get(this)?.value
    },
    write(next: Updater<T>) {
      const state = internal_store.get(this) as ZenState<T>

      if (!state || Object.is(state.value, next)) return

      state.value = isCallable(next) ? next(state.value) : next

      internal_store.set(this, state)

      state.subscribers.forEach((sub) => sub(state.value))
    },
    subscribe(listener: Listener<T>) {
      const state = internal_store.get(this)

      if (!state) return noop

      state.subscribers.add(listener)

      return () => {
        state.subscribers.delete(listener)
      }
    },
  }
}
