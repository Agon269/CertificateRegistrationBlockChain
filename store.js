const createStore = (init) => {
  let store = null;
  const get = () => store;
  const set = (operation) => (store = operation(store));

  store = init(get, set);

  const useStore = () => {
    return store;
  };
  return useStore;
};
