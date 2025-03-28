import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);
    const [userId, setUserId] = useState(null);


    const checkIfUserIsLoggedIn = async () => {
        try {
            console.log('making request');
            
            const response = await axios.get('http://localhost:3003/auth/validate', { withCredentials: true });
            if (response?.data?.status === 'valid') {
                // setIsAdmin(response?.data?.role === 'admin');
                setFirstName(response?.data?.firstName);
                setLastName(response?.data?.lastName);
                setIsLoggedIn(true);
                setUserId(response?.data?.user_id);
                return true;
            };
        }
        catch (e) {
            setIsLoggedIn(false);
            setUserId(null);
            return false;
        };
    }

    const value = {
        isAdmin,
        firstName,
        lastName,
        userId,
        setUserId,
        isLoggedIn,
        setIsLoggedIn,
        checkIfUserIsLoggedIn,
    }

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}