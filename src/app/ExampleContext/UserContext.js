import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [name, setName]           = useState("Dionlan");
    const [location, setLocation]   = useState("Brasília")

    return(
        <UserContext.Provider
            value={{
                name,
                location,
                setName,
                setLocation
            }}>
                {children}
            
        </UserContext.Provider>
    )
}

