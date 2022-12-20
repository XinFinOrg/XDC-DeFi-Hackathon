import React, { createContext, useState } from 'react'
interface AppContextInterface {
    currentWalletAddress: string,
    key: string,
    email: string,
    userInfo: object,
    favors: Array<[]>
}

// This was deprecated in favor redux thunk slices, could be used for guest mode data in future

export const AppContext = createContext<AppContextInterface | any>({});

export const AppProvider = (props: { children: any }) => {
    const [loggedin, setLoggedin] = useState<boolean | string>(false);
    const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [userInfo, setUserInfo] = useState({});
    const [favors, setFavors] = useState([]);

    
    return (
        <AppContext.Provider value={{ currentWalletAddress, setCurrentWalletAddress, key, setKey, email, setEmail, userInfo, setUserInfo, favors, setFavors, loggedin, setLoggedin }}>
            {props.children}
        </AppContext.Provider >
    )
};

export default AppProvider;

