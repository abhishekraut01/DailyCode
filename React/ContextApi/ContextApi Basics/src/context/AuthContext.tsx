import { useContext, createContext, useState, useEffect } from "react";

// ✅ Define user type
type UserT = {
  username: string;
  email?: string;
  password: string;
};

// ✅ Proper context type
interface CreateContextT {
  user: UserT | null;
  setUser: React.Dispatch<React.SetStateAction<UserT | null>>;
}

// ✅ Create context
const authContext = createContext<CreateContextT | null>(null);

// ✅ Provider component
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserT | null>(null);

  useEffect(()=>{
    const userData = localStorage.getItem('user')
    if(userData){
      setUser(JSON.parse(userData))
    }
  },[setUser])

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

// ✅ Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }
  return context;
};
