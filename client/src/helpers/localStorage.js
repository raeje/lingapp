const getItem = (name) => {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};

const setItem = (name, value = null) => {
  localStorage.setItem(name, value ? JSON.stringify(value) : null);
};

const setLocalStorageRole = (role) => {
  localStorage.setItem("role", role ? JSON.stringify(role) : null);
};

export { getItem, setItem, setLocalStorageRole };
