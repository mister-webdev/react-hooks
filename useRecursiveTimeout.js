const useRecursiveTimeout = (callback, delay = 1000, cancelled = false) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
    cancelled && (savedCallback.current = null)
  }, [callback, cancelled])

  useEffect(() => {
    const tick = () => {
      let ret = savedCallback?.current
      if (ret) {
        ret = savedCallback?.current()
      }
      if (!ret && ret !== null) {
        queueMicrotask(() => setTimeout(tick, delay))
      }
    }

    const timer = setTimeout(tick, delay)
    if (cancelled) clearTimeout(timer)
    return () => clearTimeout(timer)
  }, [delay, cancelled])
}


// usage
const Counter = () => {
  const [count, setCount] = useState(0)
  const [cancelled, setCancelled] = useState(false)

  useRecursiveTimeout(() => setCount(count + 1), 1000, cancelled)

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button> {count}{" "}
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCancelled(true)}>Cancel Timeout</button>
    </div>
  )
}