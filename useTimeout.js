const useTimeout = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if(delay !== null) {
      let id = setTimeout(tick, delay)
      return () => clearTimeout(id)
    }
  }, [delay])
}

//Example

const Timer = () => {
  const [seconds, setSeconds] = useState(0)
  useTimeout(() => {
    setSeconds(seconds + 1)
  }, 1000)

  return <p>{seconds}</p>
}