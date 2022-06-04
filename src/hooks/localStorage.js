class useLocalStorage {
  setItem = (key, value) => localStorage.setItem(key, value);
  getItem = (key) => localStorage.getItem(key);
}

export default useLocalStorage;