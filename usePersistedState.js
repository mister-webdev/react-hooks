/*
Returns a stateful value, persisted in localStorage, and a function 
to update it.
*/

const usePersistedState = (name, defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const nameRef = useRef(name);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(name);
      storedValue !== null
        ? setValue(storedValue)
        : localStorage.setItem(name, defaultValue);
    } catch {
      setValue(defaultValue);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, value);
    } catch {}
  }, [value]);

  useEffect(() => {
    const lastName = nameRef.current;
    if (name !== lastName) {
      try {
        localStorage.setItem(name, value);
        nameRef.current = name;
        localStorage.removeItem(lastName);
      } catch {}
    }
  }, [name]);

  return [value, setValue];
};

/*
Example
*/

const ComponentName = ({ name }) => {
  const [val, setVal] = usePersistedState(name, 10);

  return (
    <input
      value={val}
      onChange={(e) => {
        setVal(e.target.value);
      }}
    />
  );
};

const App = () => {
  const [name, setName] = useState('my-value');

  return (
    <>
      <ComponentName name={name} />
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </>
  );
};
