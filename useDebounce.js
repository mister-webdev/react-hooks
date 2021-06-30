import { useCallback, useEffect, useState } from "react"

const useDebounce = (effect, delay, deps) => {
  const callback = useCallback(effect, deps)

  useEffect(() => {
    const handler = setTimeout(() => callback(), delay)

    return () => clearTimeout(handler)
  }, [callback, delay])
}

// usage
export const App = () => {
  const [value, setValue] = useState(0)
  useDebounce(() => console.log(value), 1000, [value])
  return <button onClick={() => setValue(value + 1)}>{value}</button>
}