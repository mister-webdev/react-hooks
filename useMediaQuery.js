/*
Checks if the current environment matches a given media query 
and returns the appropriate value.
*/

const useMediaQuery = (query, whenTrue, whenFalse) => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) return whenFalse

  const mediaQuery = window.matchMedia(query)
  const [match, setMatch] = useState(!!mediaQuery.matches)

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return match ? whenTrue : whenFalse
}

// example
const ResponsiveText = () => {
  const text = useMediaQuery(
    '(max-width: 400px)',
    'Less than 400px wide',
    'More than 400px wide'
  )
  return <span>{text}</span>
}