import { useEffect } from "react"
import { zen } from "../node_modules/@sidww/zen"
import { useZen } from "@sidww/zen/react"

const state = zen({ count: 0 })

state.subscribe((data) => {
  console.log("CHANGE: ", data)
})

function App() {
  const count = useZen(state, (s) => s.count)

  const handleClick = () => {
    state.write((p) => ({ ...p, count: p.count + 10 }))
  }

  useEffect(() => {
    console.log("Count change: ", count)
  }, [count])

  return (
    <div className="App">
      {count}
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default App
