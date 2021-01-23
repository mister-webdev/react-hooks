const useFetch = (url, options) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options)
        const json  = await res.json()
        setResponse(json)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [url, options])
  return { response, error }
}

/* 
Example
*/

const FetchPerson = props => {
  const res = useFetch('https://swapi.co/api/people/1/', {})
  if (!res.response) {
    return <div>Loading...</div>
  }

  const person = res.response.name

  return (
    <div>{person}</div>
  )
}