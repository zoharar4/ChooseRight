import { mainService } from "../src/services/main.service"

export const actions = {
    load,
    save,
    remove,
}

// async function loadBlog() {

// }

// async function loadRecipes() {

// }

// async function loadPlans() {

// }

async function load(type) {
    try {
        const arr = await mainService.query(type)
        console.log('loaded array:', arr)
        return arr
        // store.dispatch({ type: `SET_${type.toUpperCase()}`, arr })
    } catch (err) {
        console.log(`cannot load ${type}:`, err)
    }
}

async function save(type, obj) {
    try {
        const savedObj = await mainService.save(type, obj)
        console.log('saved object:', savedObj)
        // store.dispatch({ type: `SET_${type.toUpperCase()}`, arr })
    } catch (err) {
        console.log(`cannot save ${type}:`, err)
        throw err
    }
}

async function remove(type, id) {
    try {
        await mainService.remove(type, id)
        console.log('saved object removed with id:', id)
        // store.dispatch({ type: `SET_${type.toUpperCase()}`, arr })
    } catch (err) {
        console.log(`cannot remove ${type}:`, err)
        throw err
    }
}
