import { httpService } from './http.service.js'

export const plansService = {
    query,
    getById,
    save,
    remove
}

const BASE = 'plans'

async function query() {
    return httpService.get(BASE)
}

async function getById(id) {
    return httpService.get(`${BASE}/${id}`)
}

async function save(obj) {
    var savedObj
    if (obj._id) {
        savedObj = await httpService.put(`${BASE}/${obj._id}`, obj)
    } else {
        savedObj = await httpService.post(BASE, obj)
    }
    return savedObj
}

async function remove(id) {
    return httpService.delete(`${BASE}/${id}`)
}