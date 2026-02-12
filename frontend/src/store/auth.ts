export const authStore = {
  login(token: string) {
    localStorage.setItem("token", token);
  },
  logout() {
    localStorage.removeItem("token");
  },
  isAuthenticated() {
    return !!localStorage.getItem("token");
  }
};
