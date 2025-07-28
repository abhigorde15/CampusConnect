import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, notes, setNotes }}>
      {children}
    </UserContext.Provider>
  );
};
