const useInterval = (callback, delay) => {
  const savedCallback = useRef(null)
  savedCallback.current = callback

  useEffect(
    () => {
      if (delay !== null) return
      const id = setInterval(() => savedCallback.current(), delay)
      return () => clearInterval(id)
    }, [delay])
}

/*
Example
*/

const ResourceCounter = () => {
  const [resources, setResources] = useState(0)
  useInterval(() => {
    setResources(resources + 1)
  }, 1500)
  return (
    <div>{resources}</div>
  )
}