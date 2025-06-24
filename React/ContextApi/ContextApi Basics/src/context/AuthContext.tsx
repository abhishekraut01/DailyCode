import { useContext, createContext, useState } from "react";

type UserT = {
  username: string;
  email: string;
  password: string;
};

interface CreateContextT {
  user: UserT;
  setUser: () => void;
}

const authContext = createContext<CreateContextT | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  function fakeApiCall() {
    const userres = {
      username: "Abhishek",
      email: "Abhishek@gmail.com",
      password: "Abhishek123",
    };
    return userres;
  }

  const Data = fakeApiCall();
  setUser(Data);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
