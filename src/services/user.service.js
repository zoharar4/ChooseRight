import { httpService } from './http.service'

export const userService = {
    login,
    logout,
    getLoggedInUser,
}

async function login(credentials) {
    return httpService.post('auth/login', credentials)
}

async function logout() {
    return httpService.post('auth/logout')
}

async function getLoggedInUser() {
    return httpService.get('auth/current-user')
}
