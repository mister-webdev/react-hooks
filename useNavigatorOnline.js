/*
* Checks if the client is online or offline.
*/

const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.online === 'boolean'
  ? navigator.online
  : true

const useNavigatorOnline = () => {
  const [status, setStatus] = useState(getOnLineStatus())

  const setOnline = () => setStatus(true)
  const setOffline = () => setStatus(false)

  useEffect(() => {
    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)

    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offlinw', setOffline)
    }
  }, [])

  return status
}

/*
* Example 
*/

const StatusIndicator = () => {
  const isOnline = useNavigatorOnline()

  return <span>You are {isOnline ? 'online' : 'offline'}</span>
}