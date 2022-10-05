import React, { useState, useContext } from "react";

export const AppContext = React.createContext();

export default function AppProvider(props) {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={{ login, setLogin , user , setUser }}>
            {props.children}
        </AppContext.Provider>
    );
}
