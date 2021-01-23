const useComponentWillUnmount = onUnmountHandler => {
  useEffect(() => () => {
    onUnmountHandler()
  }, [])
}

/* 
Example
*/
const UnMountComponent = () => {
  useComponentWillUnmount(() => console.log('This component will unmount'))

  return (
    <div>Check your browser console</div>
  )
}