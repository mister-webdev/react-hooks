/*
get the current size of the browser window
*/
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [])
  return windowSize;
}

// Example
const App = () => {
  const size = useWindowSize();

  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  )
}