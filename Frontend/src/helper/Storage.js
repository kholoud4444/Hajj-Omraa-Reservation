//LOCAL STORAGE
export const setAuthUser = (id, email, token) => {

  // save object to the local storage
  // Stringify OBJECT TO TEXT
  localStorage.setItem("id", id);
  localStorage.setItem("email", email);
  localStorage.setItem("token", token);
};

export const getAuthUser = () => {
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  if (id && email && token) {
    return { id, email, token };
  }

  return null;
};

export const removeAuthUser = () => {
  if (localStorage.getItem("id")) localStorage.removeItem("id");
  if (localStorage.getItem("email")) localStorage.removeItem("email");
  if (localStorage.getItem("token")) localStorage.removeItem("token");
};
export const isAuthenticated = () => {
  const user = localStorage.getItem("id");
  return !!user; // Check if user exists
};

export const isAdmin = () => {
  const { id, email, token } = getAuthUser();
  return email == "admin@admin.com"; // Check if token contains admin role
};
