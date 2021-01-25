/*
Handles asynchronous calls
*/

const useAsync = fn => {
  const initialState = { loading: false, error: null, value: null}
  const stateReducer = (_, action) => {
    switch (action.type) {
      case 'start':
        return { loading: true, error: null, value: null }
      case 'finish':
        return { loading: false, error: null, value: action.value }
      case 'error':
        return { loading: false, error: action.error, value: null }
    }
  }

  const [state, dispatch] = useReducer(stateReducer, initialState)

  const run = async (args = null) => {
    try {
      dispatch({ type: 'start' })
      const value = await fn(args)
      dispatch({ type: 'finish', value })
    } catch (error) {
      dispatch ({ type: 'error', error })
    }
  }
  return { ...state, run }
}

/*
Example
*/

const RandomImage = props => {
  const imgFetch = useAsync(url =>
    fetch(url).then(response => response.json())
  )

  return (
    <>
    <div>
      <button
        onClick={() => imgFetch.run('https://api.url')}
        disabled={imgFetch.isLoading}
      >
        Load Image
      </button>
    </div>
    <div>
      {imgFetch.loading && <p>Loading...</p>}
      {imgFetch.error && <p>Error {imgFetch.error}</p>}
      {imgFetch.value && (
        <img 
          src={imgFetch.value.message}
          alt="avatar"
          width={400}
          height="auto"
        />
      )}
    </div>
    </>
  )
}