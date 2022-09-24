import { zen } from "@sidww/zen"

type Todo = {
  completed: boolean
  title: string
  id: number
}

const getInitialState = () => {
  const found = localStorage.getItem("__DEMO_STATE__")

  try {
    if (found) {
      return JSON.parse(found)
    }
  } catch (error) {
    console.error("PARSING ERROR: ", error)
  }

  return {
    todos: [
      {
        id: 99273,
        title: "Walk the doggo 🦮",
        completed: true,
      },
      {
        id: 37456,
        title: "Get groceries 🥕",
        completed: false,
      },
    ],
  }
}

export const state = zen<{ todos: Todo[]; input: string }>(getInitialState())

state.subscribe((data) => {
  localStorage.setItem("__DEMO_STATE__", JSON.stringify(data))
})
