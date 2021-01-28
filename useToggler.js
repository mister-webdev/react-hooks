/*
Provides a boolean state variable that can be toggled between its two states.
*/

const useToggler = initialState => {
  const [value, setValue] = useState(initialState)
  const toggleValue = useCallback(() => setValue(prev => !prev), [])
  return [value, toggleValue]
}

// example
const Switch = () => {
  const [val, toggleVal] = useToggler(false)
  return (
    <button onClick={toggleVal}>
      {val ? 'ON' : 'OFF'}
    </button>)
}