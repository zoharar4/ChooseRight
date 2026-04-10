import { createContext, useContext, useEffect, useState } from 'react'
import { userService } from '../services/user.service'

const UserContext = createContext(null)

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    console.log('user:', user)

    useEffect(() => {
        userService.getLoggedInUser()
            .then(u => setUser(u))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false))
    }, [])

    async function login(credentials) {
        const u = await userService.login(credentials)
        setUser(u)
        return u
    }

    async function logout() {
        await userService.logout()
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}
