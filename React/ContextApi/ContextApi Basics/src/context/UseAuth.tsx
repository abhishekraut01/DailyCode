import { useContext } from "react";
import { authContext } from "./AuthContext";

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
