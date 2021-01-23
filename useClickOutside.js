const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

/*
Example
*/

const HitBox = ({ onClickOutside }) => {
  const clickRef = useRef()
  useClickOutside(clickRef, onClickOutside)

  return (
    <div ref={clickRef}>
      <p>Don't hit the box</p>
    </div>
  )
}

ReactDOM.render(
  <HitBox onClickOutside={() => alert('dont\'t hit the box')} />,
  document.getElementById('root')
)