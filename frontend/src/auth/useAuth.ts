import { useAuthContext } from "./authConextHook";

export const useAuth = () => {
  const { isAuthenticated, login, logout, user } = useAuthContext();

  const loginUser = (token: string) => {
    login(token);
  };

  const logoutUser = () => {
    logout();
  };

  return {
    isAuthenticated,
    user,
    loginUser,
    logoutUser,
  };
};