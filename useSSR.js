/*
Checks if the code is running on the browser or the server.
*/

const isDOMavailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
  
const useSSR = (callback, delay) => {
  const [inBrowser, setInBrowser] = useState(isDOMavailable);

  useEffect(() => {
    setInBrowser(isDOMavailable);
    return () => setInBrowser(false);
  }, []);

  const useSSRObject = useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== 'undefined',
      canUseEventListeners: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen,
    }),
    [inBrowser]
  );

  return useMemo(
    () => Object.assign(Object.values(useSSRObject), useSSRObject),
    [inBrowser]
  );
};

/*
Example
*/

const SSRChecker = (props) => {
  let { isBrowser, isServer } = useSSR();

  return <p>{isBrowser ? 'Running on browser' : 'Running on server'}</p>;
};
