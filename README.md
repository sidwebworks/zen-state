# Zen


[![npm version](https://badgen.net/npm/v/@sidww/zen)](https://npm.im/@sidww/zen) [![npm downloads](https://badgen.net/npm/dm/@sidwebworks/get-packages)](https://npm.im/@sidwebworks/get-packages)

> Dead simple state-management

- 📦 Tiny (less than 1kb)
- 🔩 Typesafe APIs
- ⚡️ React and Selectors support

## Install

```bash
npm i @sidww/zen
```

## Usage

```ts
import { zen } from "@sidww/zen"

const todos = zen([{ id: 1, completed: false, title: "Idk man" }])
```

### Reading from state

```ts
const value = todos.read()
```

### Writing to state

```ts
todos.write([]) // Clear all todos

// Or if the next state depends on previous one

todos.write((prev) => [
  ...prev,
  { id: 123, title: "Last one", completed: true },
])

// U can also directly use the .read() method instead
```

### Subscribing to changes

```ts
todos.subscribe((state) => {
  console.log("CHANGE: ", state)
})
```


### Usage with React

```ts
import { useZen } from "@sidww/zen/react"

const todos = useZen(todosZen);
```

#### Selector support

```ts
import { useZen } from "@sidww/zen/react"

const firstTodo = useZen(todosZen, (s) => s[0]);
```

Type docs: https://paka.dev/npm/@sidww/zen

## Mentions
Strongly inspired by some of my favourite state libraries [Jotai](https://jotai.org) and [Valtio](https://valtio.pmnd.rs)
## License

MIT &copy; [sidwebworks](https://github.com/sponsors/sidwebworks)
