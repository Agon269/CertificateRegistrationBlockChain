const createStore = (init) => {
  let store = null;
  const get = () => store;
  const set = (operation) => (store = operation(store));

  // Beautiful. Our store now has a way to get
  // and set itself when we initialize it
  store = init(get, set);

  const useStore = () => {
    return store;
  };
  return useStore;
};
