import { createContext, useContext, useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'

const UserContext = createContext(null)

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        userService.getLoggedInUser()
            .then(u => setUser(u))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        function handleAuthExpired() {
            utilService.devLog('Auth expired — clearing user')
            setUser(null)
        }
        window.addEventListener('auth:expired', handleAuthExpired)
        return () => window.removeEventListener('auth:expired', handleAuthExpired)
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
