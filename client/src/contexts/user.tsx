import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";

type Context = {
    userId : string;
    setUserId : Dispatch<SetStateAction<string>>;
    token : string;
    setToken : Dispatch<SetStateAction<string>>;
};

interface IProps {
    children : ReactNode;
}

const userContext = createContext<Context>({
    userId: '',
    setUserId: () => {},
    token: '',
    setToken: () => {},
});

export const UserProvider: FC<IProps> = ({children}) => {
    const [userId, setUserId] = useState<string>('');
    const [token, setToken] = useState<string>('');

    return (
        <userContext.Provider value={{userId, setUserId, token, setToken}}>
        {children}
    </userContext.Provider>
    );
};

const useUser = () => useContext<Context>(userContext);

export default useUser;