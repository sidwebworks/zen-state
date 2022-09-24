import { useZen } from "@sidww/zen/react"
import { ChangeEventHandler } from "react"
import { state } from "./store"

const uuid = () => Math.floor(Math.random() * 99999)

function App() {
  const title = useZen(state, (s) => s.input)

  const handleClick = () => {
    const todo = {
      id: uuid(),
      title: title,
      completed: false,
    }

    state.write((p) => ({ todos: [...p.todos, todo], input: "" }))
  }

  return (
    <main className="grid place-items-center min-h-screen">
      <div className="max-w-md mx-auto w-full bg-gray-800 p-4 rounded-md">
        <div className="flex items-center justify-between gap-10">
          <Input />{" "}
          <button
            onClick={handleClick}
            className="bg-teal-600 p-2 rounded-md flex-shrink-0 text-white"
          >
            Add Todo
          </button>
        </div>
        <TodoList />
      </div>
    </main>
  )
}

function Input() {
  const query = useZen(state, (s) => s.input)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    state.write((p) => ({ ...p, input: ev.target.value }))
  }

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      className="bg-transparent w-full text-cyan-500 focus:outline-none p-1 border-b border-gray-700 focus:border-cyan-700"
    />
  )
}

function TodoList() {
  const todos = useZen(state, (s) => s.todos)

  const handleToggle = (id: number) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    )
    state.write((p) => ({ ...p, todos: updated }))
  }

  const handleDelete = (id: number) => {
    const updated = todos.filter((todo) => todo.id === id)
    state.write((p) => ({ ...p, todos: updated }))
  }

  return (
    <ul className="flex flex-col gap-3 mt-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="bg-gray-700 rounded-md text-gray-50 p-2 flex gap-3 items-center justify-between"
        >
          <div className="flex flex-col w-full">
            <span>Title: {todo.title}</span>
            <span className="text-xs">
              Completed: {todo.completed ? "✅" : "❌"}
            </span>
          </div>
          <button
            className="text-sm bg-teal-600 text-gray-50 p-2 rounded-md"
            onClick={() => handleToggle(todo.id)}
          >
            Toggle
          </button>

          <button
            className="text-sm bg-red-600 text-gray-50 p-2 rounded-md"
            onClick={() => handleDelete(todo.id)}
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  )
}
export default App
