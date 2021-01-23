const useClickInside = (ref, callback) => {
  const handleClick = e => {
    if(ref.current && ref.current.contains(e.target)) {
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

const HitBox = ({ onClickInside }) => {
  const clickRef = useRef()
  useClickInside(clickRef, onClickInside)

  return (
    <div ref={clickRef}>
      <p>Hit the box</p>
    </div>
  )
}

ReactDOM.render(
  <HitBox onClickInside={() => alert('hit the box')} />,
  document.getElementById('root')
)