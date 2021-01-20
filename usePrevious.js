//store the previous state

const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

//Example
const MoneyCount = () => {
  const [value, setValue] = useState(0)
  const lastValue = usePrevious(value)

  return (
    <div>
      <p>Current: {value}</p>
      <p>Previous: {lastValue}</p>
      <button onClick = {() => setValue(value + 1)}>
        Increment Money
      </button>
    </div>
  )
}