const useComponentDidMount = onMountHandler => {
  useEffect(() => {
    onMountHandler()
  }, [])
}

/*
Example
*/
const MountComponent = () => {
  useComponentDidMount(() => console.log('The component has been mounted'))

  return (
    <div>Check browser console</div>
  )
}