import Axios from 'axios'

// console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data) 
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    // console.log(`${BASE_URL}${endpoint}`)
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })

        return res.data
    } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[HTTP Error] ${method} ${endpoint}`, { status: err.response?.status, data })
        }
        if (err.response && err.response.status === 401) {
            if (process.env.NODE_ENV !== 'production') {
                console.log('[Auth] Cookie expired — dispatching auth:expired')
            }
            window.dispatchEvent(new Event('auth:expired'))
        }
        throw err
    }
}