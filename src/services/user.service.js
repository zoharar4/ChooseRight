import { httpService } from './http.service'
import { utilService } from './util.service'

export const userService = {
    login,
    logout,
    getLoggedInUser,
}

async function login(credentials) {
    utilService.devLog('Login — sending', { username: credentials.username })
    const res = await httpService.post('auth/login', credentials)
    utilService.devLog('Login — success', res)
    return res
}

async function logout() {
    utilService.devLog('Logout — sending')
    const res = await httpService.post('auth/logout')
    utilService.devLog('Logout — done')
    return res
}

async function getLoggedInUser() {
    const res = await httpService.get('auth/current-user')
    utilService.devLog('Current user', res)
    return res
}
