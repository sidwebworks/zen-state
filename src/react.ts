import { useSyncExternalStore } from "react"
import { Zen } from "./core"

type Selector<S, R> = (state: S) => R

export const useZen = <S, R = S>(
  zen: Zen<S>,
  selector: Selector<S, R> = (s) => s as unknown as R,
) => {
  return useSyncExternalStore<R>(
    (listener) => zen.subscribe(listener),
    () => selector(zen.read()),
    () => selector(zen.read()),
  )
}
