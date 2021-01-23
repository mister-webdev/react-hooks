const useTimeout = (callback, delay) => {
  const savedCallback = useRef(null)
  savedCallback.current = callback

  useEffect(
    () => {
      if (delay !== null) return
      const id = setTimeout(() => savedCallback.current(), delay)
      return () => clearTimeout(id)
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