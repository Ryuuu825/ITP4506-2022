import React, { useState, useContext, useEffect } from "react";

export const AppContext = React.createContext();

export default function AppProvider(props) {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [disableFooter, setDisableFooter] = useState(false);
    


    return (
        <AppContext.Provider value={{ login, setLogin , user , setUser , userName , setUserName , disableFooter , setDisableFooter }}>
            {props.children}
        </AppContext.Provider>
    );
}
